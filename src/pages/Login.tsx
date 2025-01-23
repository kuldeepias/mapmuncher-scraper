import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    // TODO: Implement Google login
    toast({
      title: "Not implemented",
      description: "Google login functionality needs to be implemented with a backend service",
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-gray-500">Sign in to access the scraping tool</p>
        </div>
        <Button
          onClick={handleGoogleLogin}
          className="w-full"
          variant="outline"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;