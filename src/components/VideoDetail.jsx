import {
  Box,
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { fetchUser } from "../utils/fetchUser";
import moment from "moment";
import { Link } from "react-router-dom";

const VideoDetail = ({ data }) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.100");
  const [userInfo] = fetchUser();
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      direction={"column"}
      cursor={"pointer"}
      shadow={"md"}
      _hover={{ shadow: "xl" }}
      rounded={"md"}
      overflow={"hidden"}
      position={"relative"}
    >
      <Link to={`/videoDetail/${data.id}`}>
        <video
          src={data.videoUrl}
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          muted
        />
        <Flex
          position={"absolute"}
          bottom={0}
          left={0}
          p={2}
          bg={bg}
          width={"full"}
          direction="column"
        >
          <Flex
            width={"full"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Text color={textColor} isTruncated fontSize={20}>
              {data.title}
            </Text>
            <Image
              src={userInfo?.photoURL}
              rounded={"full"}
              width={"50px"}
              height={"50px"}
              border={"2px"}
              borderColor={bg}
              mt={-10}
            />
          </Flex>
          <Text fontSize={12} color={textColor} ml={"auto"}>
            {moment(Date(data.id)).fromNow()}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default VideoDetail;
