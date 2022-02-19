import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { getSpecificVideo } from "../utils/fetchData";
import Spinner from "./Spinner";
import { IoHome, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import {
  MdDownload,
  MdForward10,
  MdFullscreen,
  MdOutlineReplay10,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import logo from "../img/logo.png";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}: ${mm.toString().padStart(2, "0")} : ${ss}`;
  }
  return `${mm}:${ss}`;
};

const VideoPin = () => {
  const { videoId } = useParams();
  const fireStoreDb = getFirestore(firebaseApp);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  // player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const playerRef = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpecificVideo(fireStoreDb, videoId).then((data) => {
        setVideoInfo(data);
        setIsLoading(false);
      });
    }
  }, [videoId]);

  useEffect(() => {
    // console.log(played);
  }, [muted, volume, played]);

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleFastRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const onVolumeChange = (e) => {
    setVolume(parseFloat(e / 100));
    e === 0 ? setMuted(true) : setMuted(false);
  };

  const handleProgress = (changeState) => {
    if (!seeking) {
      setPlayed(parseFloat(changeState.played / 100) * 100);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e / 100));
  };

  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };
  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(e / 100);
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  if (isLoading) return <Spinner />;

  return (
    <Flex
      width={"full"}
      height={"auto"}
      justifyContent="center"
      alignItems="center"
      direction={"column"}
      py={2}
      px={4}
    >
      <Flex alignItems="center" width={"full"} my={4}>
        <Link to={"/"}>
          <IoHome fontSize={25} />
        </Link>
        <Box width="1px" height="20px" bg={"gray.500"} mx={2}></Box>
        <Text
          isTruncated
          color={"gray.700"}
          fontWeight="semibold"
          fontSize={20}
        >
          {videoInfo?.title}
        </Text>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} width="100%">
        <GridItem w="100%" bg="blue.500" colSpan={2}>
          <Flex
            width={"full"}
            bg="black"
            position={"relative"}
            ref={playerContainer}
          >
            <ReactPlayer
              ref={playerRef}
              url={videoInfo?.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={muted}
              volume={volume}
              onProgress={handleProgress}
            />

            <Flex
              position={"absolute"}
              top={0}
              left={0}
              right={0}
              bottom={0}
              // bg={"blackAlpha.600"}
              direction="column"
              justifyContent={"space-between"}
              alignItems="center"
              zIndex={1}
              cursor={"pointer"}
            >
              <Flex
                alignItems={"center"}
                justifyContent="center"
                onClick={() => setIsPlaying(!isPlaying)}
                width="full"
                height={"full"}
              >
                {!isPlaying && (
                  <IoPlay fontSize={60} color="#f2f2f2" cursor={"pointer"} />
                )}
              </Flex>

              <Flex
                width={"full"}
                alignItems="center"
                direction={"column"}
                bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500, blackAlpha.50)"
                px="4"
              >
                <Slider
                  aria-label="slider-ex-4"
                  min={0}
                  max={100}
                  value={played * 100}
                  onChange={handleSeekChange}
                  onMouseDown={onSeekMouseDown}
                  onChangeEnd={onSeekMouseUp}
                >
                  <SliderTrack bg="teal.50">
                    <SliderFilledTrack bg="teal.300" />
                  </SliderTrack>

                  <SliderThumb boxSize={3} bg="teal.300" />
                </Slider>

                <Flex width={"full"} alignItems="center" my={2} gap={10}>
                  <MdOutlineReplay10
                    fontSize={30}
                    color="#f1f1f1"
                    cursor={"pointer"}
                    onClick={handleFastRewind}
                  />
                  <Box onClick={() => setIsPlaying(!isPlaying)}>
                    {!isPlaying ? (
                      <IoPlay
                        fontSize={30}
                        color="#f1f1f1"
                        cursor={"pointer"}
                      />
                    ) : (
                      <IoPause
                        fontSize={30}
                        color="#f2f2f2"
                        cursor={"pointer"}
                      />
                    )}
                  </Box>
                  <MdForward10
                    fontSize={30}
                    color="#f1f1f1"
                    cursor={"pointer"}
                    onClick={handleFastForward}
                  />

                  <Flex alignItems={"center"} gap={4} width={"24"}>
                    <Box onClick={() => setMuted(!muted)}>
                      {!muted ? (
                        <MdVolumeUp
                          fontSize={30}
                          color="#f1f1f1"
                          cursor={"pointer"}
                        />
                      ) : (
                        <MdVolumeOff
                          fontSize={30}
                          color="#f1f1f1"
                          cursor={"pointer"}
                        />
                      )}
                    </Box>
                    <Slider
                      aria-label="slider-ex-1"
                      min={0}
                      max={100}
                      defaultValue={volume * 100}
                      size="sm"
                      onChangeStart={onVolumeChange}
                      onChangeEnd={onVolumeChange}
                    >
                      <SliderTrack bg="teal.50">
                        <SliderFilledTrack bg="teal.300" />
                      </SliderTrack>
                      <SliderThumb boxSize={2} bg="teal.300" />
                    </Slider>
                  </Flex>

                  <Flex alignItems={"center"} gap={2}>
                    <Text fontSize={16} color={"whitesmoke"}>
                      {elapsedTime}
                    </Text>
                    <Text fontSize={16} color={"whitesmoke"}>
                      /
                    </Text>
                    <Text fontSize={16} color={"whitesmoke"}>
                      {totalDuration}
                    </Text>
                  </Flex>

                  <Image src={logo} width={"120px"} ml="auto" />
                  <MdFullscreen
                    fontSize={30}
                    color="#f1f1f1"
                    cursor={"pointer"}
                    onClick={() => {
                      screenfull.toggle(playerContainer.current);
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500" colSpan={1}></GridItem>
      </Grid>
    </Flex>
  );
};

export default VideoPin;
