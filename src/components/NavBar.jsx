import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import logo from "../img/logo.png";
import logoDark from "../img/logo_dark.png";

import { IoSearch, IoSunny, IoMoon, IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width="100vw"
      p={4}
    >
      <Link to={"/"}>
        <Image
          src={colorMode == "light" ? logoDark : logo}
          alt=""
          width={"180px"}
        />
      </Link>

      <InputGroup mx={6} width="60vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch fontSize={25} />}
        />
        <Input
          type="text"
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant={"filled"}
        />
      </InputGroup>

      <Flex alignItems={"center"} justifyContent="center">
        {colorMode == "light" ? (
          <Flex
            width={"40px"}
            height={"40px"}
            justifyContent="center"
            alignItems={"center"}
            cursor={"pointer"}
            borderRadius="5px"
            onClick={toggleColorMode}
          >
            <IoMoon fontSize={25} />
          </Flex>
        ) : (
          <Flex
            width={"40px"}
            height={"40px"}
            justifyContent="center"
            alignItems={"center"}
            cursor={"pointer"}
            borderRadius="5px"
            onClick={toggleColorMode}
          >
            <IoSunny fontSize={25} />
          </Flex>
        )}

        <Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg={bg}
            width="40px"
            height={"40px"}
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={"25"}
              color={`${colorMode == "dark" ? "#f1f1f1" : "#111"}`}
            />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
