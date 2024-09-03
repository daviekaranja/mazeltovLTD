import React from "react";
import { Box, Heading, Text, Flex, Image, Divider } from "@chakra-ui/react";
import dan from "/src/assets/dan.jpg";
import dorcas from "/src/assets/dorcas.jpg";

const AboutUs = () => {
  return (
    <Flex direction={"column"}>
      <Box textAlign={"center"} p={6} h={32} color={"white"} bg={"gray.500"}>
        <Heading mb={2} size={{ base: "md", md: "lg" }} mx={"auto"}>
          About us
        </Heading>
        <Text color={"gray.200"} fontSize={{ base: "sm", md: "lg" }}>
          Telling our inspiring story from the very begining to our days
        </Text>
      </Box>
      <Box p={4}>
        <Box bg={"gray.50"} p={2}>
          <Heading color={"brand.primary"} mt={1} size={["md", "lg"]}>
            Company Profile
          </Heading>
          <Text fontSize={["md", "lg"]} mt={2}>
            Mazeltov Commercial Agency Ltd specializes in providing corporate
            and individual loans that are backed by movable property. Our goal
            is to enable people and organizations by offering prompt, adaptable,
            and reasonably priced financial solutions to address their pressing
            needs.
            <br /> We take great pleasure in our open and honest working
            methods, affordable interest rates, and fast turnaround times, all
            of which contribute to our strong dedication to client satisfaction.{" "}
            <br />
          </Text>

          <Text fontSize={["md", "lg"]} mt={2}>
            Mazeltov is also proud to be an official partner of Airtel Kenya,
            one of the country's leading telecommunications providers. This
            collaboration allows us to offer Kenyans a wide range of Airtel
            products and services, ensuring connectivity and communication
            solutions for all.
          </Text>
        </Box>

        {/* mission and vission */}
        <Box mt={4}>
          <Flex
            direction={["column", "row"]}
            width={"100%"}
            justifyContent={"center"}
          >
            <Box p={2} textAlign={"center"} maxW={["100%", "50%"]}>
              <Heading color={"brand.primary"} mt={1} size={["md", "lg"]}>
                Our Vision
              </Heading>
              <Text p={4} fontSize={["md", "lg"]}>
                To be the most trusted and preferred commercial agency to offer
                both loans and high quality products and services provider with
                ease in Kenya.
              </Text>
            </Box>
            <Box textAlign={"center"} p={2} maxW={["100%", "50%"]}>
              <Heading color={"brand.primary"} size={["md", "lg"]}>
                Our Mission
              </Heading>
              <Text fontSize={["md", "lg"]} p={4}>
                To provide quick and reliable financial solutions and products
                that empower our clients to overcome financial challenges and
                seize opportunities.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Divider></Divider>
      <Box p={4} mx={"auto"}>
        <Heading color={"brand.primary"}>Our Team</Heading>
      </Box>

      <Flex
        bg={"gray.50"}
        direction={{ base: "column", md: "row" }}
        width={"100%"}
        p={2}
        gap={6}
        justifyContent={"space-evenly"}
      >
        <Box rounded={"md"} p={4} bg={"gray.50"} maxW={["100%", 450]}>
          <Text fontSize={"md"}>
            <Heading pb={2} size={"md"}>
              Duncan Njuguna, CEO and Founder
            </Heading>
            Duncan is a visionary leader with over 6 years of experience in the
            financial services industry. <br /> As the Founder and CEO of
            Mazeltov, Mr. Njuguna has been instrumental in establishing the
            company as a trusted partner for individuals and businesses seeking
            quick, reliable loans on items. <br />
            His deep understanding of Kenya’s economic landscape, coupled with
            his passion for financial inclusion, has driven Mazeltov’s growth
            and success.
          </Text>
          <Image mt={4} h={["100%", 300]} rounded={"lg"} src={dan} />
        </Box>

        <Box>
          <Divider></Divider>
        </Box>
        <Box rounded={"md"} p={4} bg={"gray.50"} maxW={["100%", 450]}>
          <Text fontSize={"md"}>
            <Heading pb={2} size={"md"}>
              Dorcas Naita, Co-Founder
            </Heading>
            Dorcas is a dynamic and innovative leader who has played a pivotal
            role in the growth and development of Mazeltov Commercial Agency.{" "}
            <br /> As the Co-Founder, Dorcus has been at the forefront of
            driving the company’s mission to provide accessible loan solutions
            to individuals and businesses. <br /> Her strategic vision and
            commitment to financial empowerment have positioned Mazeltov as a
            leader in the loan items sector in Embu, Makutano.
          </Text>
          <Image mt={4} h={["100%", 300]} rounded={"lg"} src={dorcas} />
        </Box>
      </Flex>
      <Box m={4}>
        <Divider></Divider>
      </Box>
    </Flex>
  );
};

export default AboutUs;
