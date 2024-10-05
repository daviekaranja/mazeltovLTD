import { useEffect, useState } from "react";
import ApiService from "./ApiService";

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
    { label: "1GB, 1 HR", price: "19" },
    { label: "250MB, 24 HRS", price: "20" },
    { label: "1GB, 24 HRS", price: "99" },
    { label: "1.25GB, 12:00PM", price: "55" },
    { label: "2.5 GB, 7 DAYS", price: "300" },
    { label: "6.5 GB, 7 DAYS", price: "700" },
    { label: "1.2GB, 30 DAYS", price: "250" },
    { label: "2.5 GB, 30 DAYS", price: "500" },
    { label: "10 GB, 30 DAYS", price: "1001" },
    { label: "350 MB, 7 DAYS", price: "49" },
    { label: "1.5 GB, 3 HRS", price: "50" },
  ],
  sms: [
    { label: "1000SMS, 7 DAYS", price: "30" },
    { label: "20 SMS, 1 DAY", price: "5" },
    { label: "200 SMS, 1 DAY", price: "10" },
    { label: "100 SMS, 7 DAYS", price: "21" },
    { label: "1500 SMS, 30 DAYS", price: "101" },
    { label: "3500 SMS, 30 DAYS", price: "201" },
    { label: "50 FLEX, 12:00pm", price: "51" },
  ],
  minutes: [
    { label: "300 MIN, 30 DAYS", price: "499" },
    { label: "800 MIN, 30 DAYS", price: "1000" },
  ],
  minutesPlusData: [{ label: "8GB+ 400 MINUTES", price: "999" }],
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
