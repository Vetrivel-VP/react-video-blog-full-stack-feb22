import {
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FaChevronDown } from "react-icons/fa";
import { categories } from "../data";
import {
  IoCheckmark,
  IoClose,
  IoCloudUpload,
  IoLocation,
  IoTrash,
  IoWarning,
} from "react-icons/io5";
import Spinner from "./Spinner";

import { firebaseApp } from "../firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AlertMsg from "./AlertMsg";

const Create = () => {
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const editorRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);

  const storage = getStorage(firebaseApp);

  const uploadImage = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log({ error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setVideoAsset(url);
          setLoading(false);
          setAlert(true);
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setAlertMsg("Your Video uploaded successfully");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Your Video was Removed");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width="100vw"
      minHeight={"100vh"}
      bg={"whiteAlpha.500"}
      padding="10"
    >
      <Flex
        width={"80vw"}
        height={"full"}
        border="1px"
        borderColor={"gray.300"}
        borderRadius={"md"}
        p={"4"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"2"}
      >
        {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )}
        <Input
          variant="flushed"
          placeholder="Title"
          focusBorderColor={"gray.400"}
          isRequired
          errorBorderColor={"red"}
          type="text"
          _placeholder={{ color: "gray.500" }}
          fontSize={20}
        />

        <Flex
          justifyContent={"space-between"}
          width="full"
          alignItems={"center"}
          gap={8}
          my={4}
        >
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown fontSize={15} />}
              width="full"
              colorScheme="blue"
            >
              Actions
            </MenuButton>
            <MenuList zIndex={101} width={"md"} shadow="xl">
              {categories &&
                categories.map((data) => (
                  <MenuItem
                    key={data.id}
                    _hover={{ bg: "blackAlpha.300" }}
                    fontSize={20}
                    px={4}
                  >
                    {data.iconSrc} <Text ml={4}>{data.name}</Text>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<IoLocation color="#444" fontSize={20} />}
            />
            <Input
              variant="flushed"
              placeholder="Location"
              focusBorderColor={"gray.400"}
              isRequired
              errorBorderColor={"red"}
              type="text"
              _placeholder={{ color: "gray.500" }}
              fontSize={20}
            />
          </InputGroup>
        </Flex>

        <Flex
          border={"1px"}
          borderColor={"gray.500"}
          height="400px"
          borderStyle={"dashed"}
          width={"full"}
          borderRadius={"md"}
          overflow="hidden"
          position={"relative"}
        >
          {!videoAsset ? (
            <FormLabel width={"full"}>
              <Flex
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
                height="full"
                width={"full"}
              >
                <Flex
                  direction={"column"}
                  alignItems="center"
                  justifyContent={"center"}
                  cursor="pointer"
                  height="full"
                  width={"full"}
                >
                  {loading ? (
                    <Spinner progress={progress} />
                  ) : (
                    <>
                      <IoCloudUpload fontSize={30} color="#666" />
                      <Text mt={5} fontSize={20} color="gray.600">
                        Click to upload
                      </Text>
                    </>
                  )}
                </Flex>
              </Flex>
              {!loading && (
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              )}
            </FormLabel>
          ) : (
            <Flex
              width={"full"}
              height="full"
              justifyContent={"center"}
              alignItems={"center"}
              bg="black"
              position={"relative"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                width={"40px"}
                height={"40px"}
                rounded="full"
                bg={"red"}
                top={5}
                right={5}
                position={"absolute"}
                cursor={"pointer"}
                zIndex={10}
                onClick={deleteImage}
              >
                <IoTrash fontSize={20} color="white" />
              </Flex>
              <video
                src={videoAsset}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </Flex>
          )}
        </Flex>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey={process.env.REACT_APP_TINYMCE_EDITOR_API}
          init={{
            height: 500,
            width: "100%",
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Create;
