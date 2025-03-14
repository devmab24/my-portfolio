
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-foreground mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
          <br />
          <span className="text-sm italic mt-2 block">
            Path: {location.pathname}
          </span>
        </p>
        <Link to="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
