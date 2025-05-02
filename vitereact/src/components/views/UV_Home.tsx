import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_notification } from "@/store/main";

// Define the TypeScript interface for a recipe summary
interface RecipeSummary {
  id: string;
  title: string;
  thumbnail_url: string;
  short_description: string;
}

const UV_Home: React.FC = () => {
  // Local state for featured recipes and inline search input
  const [featured_recipes, setFeaturedRecipes] = useState<RecipeSummary[]>([]);
  const [inline_search_input, setInlineSearchInput] = useState<string>("");

  // Redux dispatch
  const dispatch = useDispatch();

  // Get site_settings from the global state
  const site_settings = useSelector((state: any) => state.global.site_settings);

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to fetch featured recipes from the backend API
  const fetch_featured_recipes = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";
      const response = await axios.get(`${API_BASE_URL}/recipes?is_featured=true`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setFeaturedRecipes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch featured recipes", error);
      dispatch(set_notification({ error: "Failed to load featured recipes" }));
    }
  };

  // Navigate to the Recipe Listing Page on CTA click
  const navigate_to_recipe_listing = () => {
    navigate("/recipes");
  };

  // Handle inline search form submission
  const handle_inline_search_submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inline_search_input.trim() !== "") {
      navigate(`/recipes/search?query=${encodeURIComponent(inline_search_input)}`);
    }
  };

  // Fetch featured recipes on component mount
  useEffect(() => {
    fetch_featured_recipes();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://picsum.photos/seed/libya/1200/500"
          alt="Traditional Libyan Cuisine"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-2">{site_settings.site_title}</h1>
          <p className="text-xl mb-4">{site_settings.tagline}</p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={navigate_to_recipe_listing}
          >
            Explore Recipes
          </button>
        </div>
      </div>

      {/* Inline Search Bar */}
      <div className="max-w-md mx-auto mt-6">
        <form onSubmit={handle_inline_search_submit} className="flex">
          <input
            type="text"
            value={inline_search_input}
            onChange={(e) => setInlineSearchInput(e.target.value)}
            placeholder="Search recipes..."
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Search
          </button>
        </form>
      </div>

      {/* Featured Recipes Section */}
      <div className="mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Featured Recipes</h2>
        {featured_recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured_recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg"
              >
                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{recipe.title}</h3>
                  <p className="text-gray-600">{recipe.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No featured recipes available.</p>
        )}
      </div>
    </>
  );
};

export default UV_Home;