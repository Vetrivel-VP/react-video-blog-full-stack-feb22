import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import logo from "../img/logo.png";
import logoDark from "../img/logo_dark.png";

import { IoSearch, IoSunny, IoMoon, IoAdd, IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ user }) => {
  const bg = useColorModeValue("gray.600", "gray.300");
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
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
          // onFocus={() => navigate("/search")}
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
              color={`${colorMode == "dark" ? "#111" : "#f1f1f1"}`}
            />
          </Flex>
        </Link>

        <Menu>
          <MenuButton>
            <Image src={user?.photoURL} width="40px" rounded={"full"} />
          </MenuButton>
          <MenuList shadow={"dark-lg"}>
            <Link to={`/profile/${user?.uid}`}>
              <MenuItem>My Account</MenuItem>
            </Link>
            <MenuItem flexDirection={"row"} alignItems="center" gap={4}>
              Log Out <IoLogOut fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
