import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TopNavigation from "@/components/navigation/TopNavigation";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyBeatBizBanner from "@/components/landing/WhyBeatBizBanner";
import MoreFeatures from "@/components/landing/MoreFeatures";
import PricingPlans from "@/components/landing/PricingPlans";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (profile) {
      setUserRole(profile.role);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    }
  };

  const getDashboardRoute = () => {
    switch (userRole) {
      case 'producer':
        return '/producer';
      case 'artist':
        return '/artist';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <TopNavigation
        session={session}
        userRole={userRole}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />

      {/* Main Content */}
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="why-beatbiz">
        <WhyBeatBizBanner />
      </section>
      <section id="more-features">
        <MoreFeatures />
      </section>
      <section id="pricing">
        <PricingPlans />
      </section>
      <section id="marketplace">
        <CallToAction />
      </section>
    </div>
  );
};

export default Index;