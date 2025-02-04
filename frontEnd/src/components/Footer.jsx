// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
// import { AiFillTikTok } from "react-icons/ai";
// import { IoLogoWhatsapp } from "react-icons/io";
// import {
//   Box,
//   Text,
//   Flex,
//   InputGroup,
//   InputRightAddon,
//   Button,
//   Input,
//   Link,
//   Icon,
// } from "@chakra-ui/react";

// const Footer = () => {
//   const navigate = useNavigate();
//   return (
//     <Box fontSize={"sm"} color={"gray.500"} bg={"gray.900"}>
//       <Flex
//         p={{ base: 2, md: 4 }}
//         alignItems={"center"}
//         justifyContent={"center"}
//         gap={6}
//         direction={{ base: "column", md: "row" }}
//       >
//         <Text maxW={{ base: "100%", md: "50%" }}>
//           Subscribe to our Newsletter to be notified of our latest Products and
//           Services
//         </Text>

//         <InputGroup flex={"1"}>
//           <Input bg={"white"} type="email" placeholder="Enter Your Email" />
//           <InputRightAddon>
//             <Button>Subscribe</Button>
//           </InputRightAddon>
//         </InputGroup>
//       </Flex>
//       {/* this is the footer object */}
//       <Flex
//         justifyContent={"space-between"}
//         gap={6}
//         p={4}
//         bg={"gray.800"}
//         color={"gray.400"}
//         direction={{ base: "column", md: "row" }}
//       >
//         <Box maxW={{ base: "100%", md: "25%" }}>
//           <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
//             Mazeltov
//           </Text>
//           <Text noOfLines={4}>
//             Mazeltov Commercial Agencies is a Kenyan-based company committed to
//             providing reliable and trustworthy services across a variety of
//             industries. With a focus on quality, integrity, and customer
//             satisfaction, Mazeltov strives to connect consumers with genuine
//             products and services, ensuring a smooth and secure purchasing
//             experience. The company emphasizes transparent business practices,
//             aiming to build long-lasting relationships with clients by
//             prioritizing their needs and safeguarding their interests. Through
//             its strong service framework, Mazeltov seeks to uphold the highest
//             standards in delivering value to its customers.
//           </Text>
//         </Box>
//         <Flex direction={"column"}>
//           <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
//             Links
//           </Text>
//           <Link>Home</Link>
//           <Link>Services</Link>
//           <Link>About</Link>
//           {/* <Link>Buy Airtime Online</Link> */}
//           <Link display={["none", "flex"]} onClick={() => navigate("/manage")}>
//             Admin
//           </Link>
//         </Flex>
//         <Box>
//           <Text color={"gray.300"} fontSize={"md"} fontWeight={"bold"}>
//             Products
//           </Text>
//           <Flex direction={"column"}>
//             <Link>Airtel 4G Mifi</Link>
//             <Link href="/buy-airtime">Buy Airtime</Link>
//           </Flex>
//         </Box>
//         <Box>
//           <Text
//             color={"gray.300"}
//             fontWeight={"bold"}
//             fontSize={"md"}
//             textAlign={"center"}
//           >
//             Follow Us
//           </Text>
//           <Flex mt={2} gap={6} justifyContent={"center"}>
//             <Link target="blank" href="https://web.facebook.com/mazeltov34">
//               <Icon boxSize={6} as={FaFacebook} />
//             </Link>
//             <Link>
//               <Icon boxSize={6} as={FaSquareInstagram} />
//             </Link>
//             <Link href="https://www.tiktok.com/@mazeltov2024?" target="blank">
//               <Icon boxSize={6} as={AiFillTikTok} />
//             </Link>
//             <Link
//               target="blank"
//               href="https://wa.me/254784441637?text=Hello Mazeltov"
//             >
//               <Icon boxSize={6} as={IoLogoWhatsapp} />
//             </Link>
//           </Flex>
//         </Box>
//       </Flex>
//       {/* <Divider /> */}
//       <Flex
//         bg={"gray.900"}
//         direction={"row"}
//         gap={6}
//         p={{ base: 2, md: 4 }}
//         justifyContent={"center"}
//       >
//         <Link href="/legal/data-policies">Terms and Conditions</Link>
//         <Link href="/legal/data-policies">Privacy Policy</Link>
//         <p>&copy; 2025 Mazeltov. All rights reserved</p>
//       </Flex>
//     </Box>
//   );
// };

// export default Footer;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { i } from "framer-motion/client";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const getBackendData = async () => {
    try {
      const response = await fetch("https://api.mazeltov.co.ke");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`Backend Data: ${getBackendData()}`);

  return (
    <div className="text-sm text-gray-500 bg-gray-900">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
        <p className="max-w-full md:max-w-1/2 text-center md:text-left">
          Subscribe to our Newsletter to be notified of our latest Products and
          Services
        </p>
        <div className="flex flex-1">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="bg-white px-4 py-2 w-full rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-6 p-4 bg-gray-800 text-gray-400">
        <div className="w-[300px]">
          <h3 className="text-gray-300 font-bold text-md">Mazeltov</h3>
          <p className="line-clamp-4">
            Mazeltov Commercial Agencies is a Kenyan-based company committed to
            providing reliable and trustworthy services across a variety of
            industries. With a focus on quality, integrity, and customer
            satisfaction, Mazeltov strives to connect consumers with genuine
            products and services, ensuring a smooth and secure purchasing
            experience.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-gray-300 font-bold text-md">Links</h3>
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/services" className="hover:text-white">
            Services
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link to="/buy-airtime" className="hover:text-white">
            Buy Airtime Online
          </Link>

          <a
            onClick={() => navigate("/manage")}
            className="hover:text-white cursor-pointer hidden md:flex"
          >
            Admin
          </a>
        </div>

        <div>
          <h3 className="text-gray-300 font-bold text-md">Products</h3>
          <div className="flex flex-col">
            <a href="#" className="hover:text-white">
              Airtel 4G Mifi
            </a>
            <a href="/buy-airtime" className="hover:text-white">
              Buy Airtime
            </a>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-gray-300 font-bold text-md">Follow Us</h3>
          <div className="flex justify-center gap-6 mt-2">
            <a
              href="https://web.facebook.com/mazeltov34"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <FaFacebook />
            </a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">
              <FaSquareInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mazeltov2024?"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <AiFillTikTok />
            </a>
            <a
              href="https://wa.me/254784441637?text=Hello Mazeltov"
              target="_blank"
              className="text-xl text-gray-400 hover:text-white"
            >
              <IoLogoWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 flex flex-col md:flex-row gap-6 p-4 justify-center text-center">
        <a href="/legal/data-policies" className="hover:text-white">
          Terms and Conditions
        </a>
        <a href="/legal/data-policies" className="hover:text-white">
          Privacy Policy
        </a>
        <p>&copy; {new Date().getFullYear()} Mazeltov. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
