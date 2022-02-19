import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import { categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoDetail from "./VideoDetail";
import NotFound from "./NotFound";

const Feed = () => {
  const fireStoreDb = getFirestore(firebaseApp);
  const [feeds, setFeeds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (categoryId) {
      categoryFeeds(fireStoreDb, categoryId).then((data) => {
        setFeeds(data);
        setIsLoading(false);
      });
    } else {
      getAllFeeds(fireStoreDb).then((data) => {
        setFeeds(data);
        setIsLoading(false);
      });
    }
    // console.log(feeds);
  }, [categoryId]);

  if (isLoading) return <Spinner msg={"Loading your feeds"} />;
  if (!feeds?.length > 0) return <NotFound />;

  return (
    <SimpleGrid
      minChildWidth="300px"
      autoColumns={"max-content"}
      spacing="20px"
      width={"full"}
      px={2}
      overflowX="hidden"
    >
      {feeds &&
        feeds?.map((data) => (
          <VideoDetail maxWidth={420} height="80px" key={data.id} data={data} />
        ))}
    </SimpleGrid>
  );
};

export default Feed;
