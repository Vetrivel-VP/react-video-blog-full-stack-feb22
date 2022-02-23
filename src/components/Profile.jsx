import {
  Button,
  Flex,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoCloudUpload, IoHeart } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { getUserInfo, userCreatedVideos } from "../utils/fetchData";
import RecommendedFeeds from "./RecommendedFeeds";
import Spinner from "./Spinner";
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const Profile = () => {
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const fireStoreDb = getFirestore(firebaseApp);

  useEffect(() => {
    setIsLoading(true);

    if (userId) {
      getUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
        setIsLoading(false);
      });
      userCreatedVideos(fireStoreDb, userId).then((data) => {
        setFeeds(data);
      });
    }
  }, [userId]);

  if (isLoading) return <Spinner />;
  return (
    <Flex
      alignItems={"center"}
      justifyContent="center"
      width={"full"}
      height="auto"
      p={2}
      direction="column"
    >
      <Flex
        justifyContent={"center"}
        width="full"
        position={"relative"}
        direction="column"
        alignItems={"center"}
      >
        <Image
          src={randomImage}
          height={"320px"}
          width="full"
          objectFit={"cover"}
          borderRadius={"md"}
        />

        <Image
          src={userInfo?.photoURL}
          width="120px"
          objectFit={"cover"}
          border="2px"
          borderColor={"gray.100"}
          rounded="full"
          shadow={"lg"}
          mt="-16"
        />
      </Flex>

      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <RecommendedFeeds feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default Profile;
