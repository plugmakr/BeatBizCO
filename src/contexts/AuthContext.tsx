import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    userRole: null,
    isLoading: true,
  });

  const refreshSession = async () => {
    try {
      console.log('Refreshing session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        setState({
          session,
          user: session.user,
          userRole: profile?.role || null,
          isLoading: false,
        });

        localStorage.setItem('userRole', profile?.role || '');
      } else {
        setState({
          session: null,
          user: null,
          userRole: null,
          isLoading: false,
        });
        localStorage.removeItem('userRole');
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in...');
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!session) throw new Error('No session after sign in');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile?.role) throw new Error('No role found for user');

      setState({
        session,
        user: session.user,
        userRole: profile.role,
        isLoading: false,
      });

      localStorage.setItem('userRole', profile.role);
      navigate(`/${profile.role}/dashboard`);
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in',
        variant: 'destructive',
      });
    }
  };

  const signUp = async (email: string, password: string, role: string) => {
    try {
      console.log('Signing up...');
      const { data: { session }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!session) throw new Error('No session after sign up');

      // Profile will be created by database trigger
      setState({
        session,
        user: session.user,
        userRole: role,
        isLoading: false,
      });

      localStorage.setItem('userRole', role);
      toast({
        title: 'Success',
        description: 'Account created successfully! Please check your email to verify your account.',
      });
      navigate('/auth');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState({
        session: null,
        user: null,
        userRole: null,
        isLoading: false,
      });

      localStorage.clear();
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    console.log('Setting up auth subscriptions...');
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_OUT') {
        setState({
          session: null,
          user: null,
          userRole: null,
          isLoading: false,
        });
        localStorage.clear();
        navigate('/');
      } else if (session) {
        await refreshSession();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
