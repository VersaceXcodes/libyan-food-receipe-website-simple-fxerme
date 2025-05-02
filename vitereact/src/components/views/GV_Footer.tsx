import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GV_Footer: React.FC = () => {
  // Get site_settings from global state using useSelector.
  const { site_title, tagline } = useSelector((state: any) => state.global.site_settings);
  
  // Current year for the copyright text.
  const current_year = new Date().getFullYear();

  // Function to handle footer link clicks.
  const handle_footer_link = (target: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log("Navigating via footer link to", target);
    // Additional actions can be added here if needed.
  };

  return (
    <>
      <footer className="bg-gray-100 text-gray-600 py-6">
        <div className="container mx-auto px-4">
          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <Link 
              to="/" 
              onClick={(e) => handle_footer_link("/", e)}
              className="hover:text-gray-800"
            >
              Home
            </Link>
            <Link 
              to="/recipes" 
              onClick={(e) => handle_footer_link("/recipes", e)}
              className="hover:text-gray-800"
            >
              Recipes
            </Link>
            <Link 
              to="/about" 
              onClick={(e) => handle_footer_link("/about", e)}
              className="hover:text-gray-800"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={(e) => handle_footer_link("/contact", e)}
              className="hover:text-gray-800"
            >
              Contact
            </Link>
          </nav>

          {/* Optional Social Media Links */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
              Instagram
            </a>
          </div>

          {/* Site Branding and Copyright */}
          <div className="text-center text-sm">
            <p className="mb-1 font-semibold">{site_title}</p>
            <p className="mb-1">{tagline}</p>
            <p className="text-gray-500">&copy; {current_year} {site_title}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GV_Footer;