import React, { useEffect, useState } from "react";
import { getApi } from "../../../services/api";

const Filter = ({ cities = [], onResults, categoryId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();

      // Add filters to the query string
      if (searchTerm) query.append("name", searchTerm);
      if (selectedCity) query.append("city", selectedCity);
      if (selectedDate) query.append("date", selectedDate);
      query.append("category",categoryId ); 

      const response = await getApi("api/events/search?" + query.toString()); 
      const data = response?.data?.data; 

      onResults(data); // Pass the results to the parent component
    } catch (error) {
      console.error("Error fetching events:", error);
      onResults([]); // Return an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(""); 
    setSelectedCity(""); 
    setSelectedDate(""); 
  }, [categoryId]); 

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Term */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Search Events
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter event name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Select City */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSearch}
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary"
          } text-white px-6 py-2 rounded-lg shadow-md transition-all`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default Filter;
