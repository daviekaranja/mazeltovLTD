import { useEffect, useState } from "react";
import ApiService from "./ApiService";
import { p } from "framer-motion/client";

export const categories = [
  "Electronics",
  "Home Appliances",
  "Fashion",
  "Beauty & Health",
  "Books",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Food & Beverages",
  "Office Supplies",
];

export const showErrorToast = async (id, title, description) => {
  // Dynamically import `createStandaloneToast` from Chakra UI
  const { createStandaloneToast } = await import("@chakra-ui/react");
  const { toast } = createStandaloneToast();

  // Show or update the error toast
  toast({
    id, // Unique ID to manage single instance
    title,
    description,
    status: "error",
    duration: 5000, // Duration in milliseconds
    isClosable: true, // Allow the toast to be closed by the user
    position: "top", // Position of the toast on the screen
  });
};

export const offers = {
  data: [
    { label: "1GB, 1 HR", price: "19", productID: "001" },
    { label: "250MB, 24 HRS", price: "20", productID: "002" },
    { label: "2GB FOR 1HR", price: "31", productID: "003" },
    { label: "350 MB, 7 DAYS", price: "49", productID: "004" },
    { label: "1.5GB FOR 3 HOURS", price: "50", productID: "005" },
    { label: "1.25GB, Till Midnight", price: "55", productID: "006" },
    { label: "1GB, 24 HRS", price: "99", productID: "007" },
    { label: "1.2GB, 30 DAYS", price: "250", productID: "008" },
    { label: "2.5 GB, 7 DAYS", price: "300", productID: "009" },
    { label: "2.5 GB, 30 DAYS", price: "500", productID: "010" },
    { label: "6.5 GB, 7 DAYS", price: "700", productID: "011" },
    { label: "10 GB, 30 DAYS", price: "1001", productID: "012" },
    { label: "1.5 GB, 3 HRS", price: "50", productID: "013" },
    { label: "1 GB, 1 HOUR", price: "23", productID: "014" },
    { label: "2 GB, 24 HRS", price: "105", productID: "015" },
  ],
  sms: [
    { label: "20 SMS, 1 DAY", price: "5", productID: "016" },
    { label: "200 SMS, 1 DAY", price: "10", productID: "017" },
    { label: "100 SMS, 7 DAYS", price: "21", productID: "018" },
    { label: "1000SMS, 7 DAYS", price: "30", productID: "019" },
    { label: "1500 SMS, 30 DAYS", price: "101", productID: "020" },
    { label: "3500 SMS, 30 DAYS", price: "201", productID: "021" },
    { label: "UNLIMITED DAILY SMS", price: "25", productID: "022" },
    { label: "UNLIMITED WEEKLY SMS", price: "54", productID: "023" },
  ],
  minutes: [
    // { label: "20MINS FOR 1 HOUR", price: "18", productID: "024" },
    { label: "20MINS/50 KREDO TILL MIDNIGHT", price: "22", productID: "025" },
    { label: "30MINS FOR 3 HOURS", price: "26", productID: "028" },
    { label: "50 MINS TILL MIDNIGHT", price: "51", productID: "029" },
    { label: "150 KREDO TILL MIDNIGHT", price: "56", productID: "030" },
    { label: "300 MINS FOR 30 DAYS", price: "499", productID: "031" },
    { label: "800 MINS FOR 30 DAYS", price: "1000", productID: "032" },
  ],
  minutesPlusData: [
    { label: "8GB+ 400 MINUTES", price: "999", productID: "034" },
  ],
};

export const handleInputChange = (setData) => (e) => {
  const { name, value } = e.target; // the target will provide the name and value being referenced
  setData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const validatePhoneNumber = (phone, countryCode) => {
  const regex = /^(07|01)\d{8}$/;

  if (regex.test(phone)) {
    // If the phone number is valid, prepend the country code (+254)
    return true; // Removes the leading 0 and appends the country code
  }

  // If not valid, return false or handle invalid number case
  return false;
};

export const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiService.get("/products/get-products");
      console.log(response.data);
      if (response.success) {
        const data = response.data;
        setProducts(data);
      }
    };

    fetchData(); // Call the function here
  }, []);

  return products;
};
