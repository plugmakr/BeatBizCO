
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

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
  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (event === 'SIGNED_OUT') {
        setState({
          session: null,
          user: null,
          userRole: null,
          isLoading: false,
        });
        localStorage.clear();
        navigate('/', { replace: true });
      } else if (session) {
        await refreshSession();
      }
    });

    refreshSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
        localStorage.setItem('userId', session.user.id);

        // Redirect based on role
        if (profile?.role) {
          navigate(`/${profile.role}/dashboard`, { replace: true });
        }
      } else {
        setState({
          session: null,
          user: null,
          userRole: null,
          isLoading: false,
        });
        localStorage.clear();
      }
    } catch (error) {
      console.error('Session refresh error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: "Error refreshing session",
        description: "Please try signing in again",
        variant: "destructive",
      });
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
      localStorage.setItem('userId', session.user.id);

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      navigate(`/${profile.role}/dashboard`, { replace: true });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, role: string) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('No user returned from sign up');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            role,
            full_name: '',
            username: '',
          }
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });

    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState({
        session: null,
        user: null,
        userRole: null,
        isLoading: false,
      });
      
      localStorage.clear();
      navigate('/', { replace: true });
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }));
  };

  const setRole = (role: string | null) => {
    setState(prev => ({ ...prev, userRole: role }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        refreshSession,
        setUser,
        setRole,
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
