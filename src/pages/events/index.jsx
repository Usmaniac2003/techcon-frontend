import React, { useState, lazy, Suspense } from "react";
import { ChakraProvider, Spinner, Box } from "@chakra-ui/react";
import { FaMusic, FaTheaterMasks, FaFootballBall, FaUsers, FaBook, FaGlassCheers } from "react-icons/fa"; // Import icons

const categories = [
  { name: "Music", icon: <FaMusic /> },
  { name: "Theatre", icon: <FaTheaterMasks /> },
  { name: "Sports", icon: <FaFootballBall /> },
  { name: "Social", icon: <FaUsers /> },
  { name: "Education", icon: <FaBook /> },
  { name: "Parties", icon: <FaGlassCheers /> },
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Overview");

  // Dynamically load components for each category
  const loadComponent = (category) => {
    switch (category) {
      case "Music":
        return lazy(() => import("./components/Music"));
      case "Theatre":
        return lazy(() => import("./components/Theatre"));
      case "Sports":
        return lazy(() => import("./components/Sports"));
      case "Social":
        return lazy(() => import("./components/Social"));
      case "Education":
        return lazy(() => import("./components/Education"));
      case "Parties":
        return lazy(() => import("./components/Parties"));
      default:
        return null;
    }
  };

  const CategoryComponent = selectedCategory !== "Overview" ? loadComponent(selectedCategory) : null;

  return (
    <ChakraProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/6 bg-gray-800 text-white p-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`cursor-pointer p-2 rounded flex items-center space-x-3 ${
                  selectedCategory === category.name ? "bg-gray-700" : "hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Box className="text-center">
            {selectedCategory === "Overview" ? (
              <>
                <h1 className="text-3xl font-bold mb-4">Welcome to Events Overview</h1>
                <p className="text-lg">
                  Explore the latest events across multiple categories. Use the sidebar to navigate!
                </p>
              </>
            ) : (
              <Suspense fallback={<Spinner size="xl" />}>
                {CategoryComponent && <CategoryComponent onBack={() => setSelectedCategory("Overview")} />}
              </Suspense>
            )}
          </Box>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default App;
