// import React, { useState, useEffect } from "react";
// import { Flex, Text, Select, Box, Button } from "@chakra-ui/react";
// import Product from "./Product";
// import axiosClient from "../api/axiosClient";

// const Services = ({ renderButtons }) => {
//   const [localProds, setLocalProds] = useState(() => {
//     const savedProds = localStorage.getItem("products");
//     return savedProds ? JSON.parse(savedProds) : [];
//   });
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axiosClient.get("/products/get-products");

//         // Save the new data to localStorage
//         localStorage.setItem("products", JSON.stringify(data));

//         // Update the state with the new data
//         setLocalProds(data);

//         // Extract and set categories
//         const allCategories = [
//           ...new Set(data.map((product) => product.category)),
//         ];
//         setCategories(["All", ...allCategories]);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts =
//     selectedCategory === "All"
//       ? localProds
//       : localProds.filter((product) => product.category === selectedCategory);

//   return (
//     <Flex p={2} direction={"column"}>
//       <Flex
//         bg={"white"}
//         alignItems={"center"}
//         gap={5}
//         justifyContent={"center"}
//         mb={4}
//       >
//         <Text fontSize={"sm"}>Filter by Category</Text>
//         <Select
//           p={1}
//           border={"none"}
//           width={200}
//           placeholder="Select category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </Select>
//       </Flex>
//       {/* Product List */}
//       <Product products={filteredProducts} renderButtons={renderButtons} />
//     </Flex>
//   );
// };

// export default Services;

import React, { useState, useEffect } from "react";
import Product from "./Product";
import axiosClient from "../api/axiosClient";

const Services = ({ renderButtons }) => {
  const [localProds, setLocalProds] = useState(() => {
    const savedProds = localStorage.getItem("products");
    return savedProds ? JSON.parse(savedProds) : [];
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosClient.get("/products/get-products");

        // Save the new data to localStorage
        localStorage.setItem("products", JSON.stringify(data));

        // Update the state with the new data
        setLocalProds(data);

        // Extract and set categories
        const allCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(["All", ...allCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? localProds
      : localProds.filter((product) => product.category === selectedCategory);

  return (
    <div className="p-8 space-y-6 ">
      {/* Category Filter */}
      <div className="bg-white flex items-center justify-center gap-5 mb-4">
        <span className="text-sm">Filter by Category</span>
        <select
          className="p-2 border-none w-[200px] bg-gray-50 text-gray-700 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <Product products={filteredProducts} renderButtons={renderButtons} />
    </div>
  );
};

export default Services;
