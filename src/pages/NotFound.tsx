
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-4 max-w-lg p-6">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800">Page not found</p>
        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="mt-4">
            <HomeIcon className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
