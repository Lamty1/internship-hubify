
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SocialLoginOptionsProps {
  selectedRole: 'student' | 'company';
}

const SocialLoginOptions = ({ selectedRole }: SocialLoginOptionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    try {
      console.log(`Attempting ${provider} login with role:`, selectedRole);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            role: selectedRole, // Pass role as metadata
          }
        }
      });
      
      if (error) {
        throw error;
      }
      // Redirect is handled by Supabase
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Login failed",
        description: error.message || `There was a problem logging in with ${provider}.`,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Continue with GitHub</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Continue with Google</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLoginOptions;
