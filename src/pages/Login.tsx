import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { Globe, Rocket, ChartBar } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/');
        toast({
          title: "Success",
          description: "Successfully logged in!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Google Maps Business Scraper
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Extract business information effortlessly from Google Maps
          </p>
          <Button
            onClick={handleGoogleLogin}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign in with Google to Get Started
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
            <p className="text-gray-600">
              Search businesses anywhere in the world with our powerful scraping tool
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Rocket className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Real-time scraping with instant results display
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <ChartBar className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Data</h3>
            <p className="text-gray-600">
              Get comprehensive business information including ratings, reviews, and contact details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;