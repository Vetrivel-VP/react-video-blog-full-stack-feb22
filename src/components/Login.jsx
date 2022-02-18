import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import musicbg from "../img/musicbg.jpg";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase-config";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Login = ({ setUser }) => {
  const firebaseAuth = getAuth(firebaseApp);

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const login = async () => {
    const fireStoreDb = getFirestore(firebaseApp);
    const { user } = await signInWithPopup(firebaseAuth, provider);

    const { refreshToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    setUser(providerData[0]);
    setDoc(doc(fireStoreDb, "users", providerData[0].uid), providerData[0]);
    navigate("/", { replace: true });
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position="relative"
    >
      <Image src={musicbg} objectFit="cover" width={"full"} height="full" />
      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.600"}
        top={0}
        left={0}
        justifyContent="center"
        alignItems={"center"}
      >
        <HStack>
          <Button
            colorScheme="whiteAlpha"
            shadow={"lg"}
            leftIcon={<FcGoogle fontSize={25} />}
            onClick={() => login()}
          >
            Signin with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
