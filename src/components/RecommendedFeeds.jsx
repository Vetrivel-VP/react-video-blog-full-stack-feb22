import { SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";

import VideoDetail from "./VideoDetail";

const RecommendedFeeds = ({ feeds }) => {
  useEffect(() => {}, [feeds]);

  return (
    <SimpleGrid
      minChildWidth="300px"
      autoColumns={"max-content"}
      spacing="20px"
      width={"full"}
      px={2}
      overflowX="hidden"
      py={6}
    >
      {feeds &&
        feeds?.map((data) => (
          <VideoDetail maxWidth={420} height="80px" key={data.id} data={data} />
        ))}
    </SimpleGrid>
  );
};

export default RecommendedFeeds;
