import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Category, Create, Feed, NavBar, Profile, Search, VideoPin } from ".";
import { categories } from "../data";

const Home = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <Flex width={"full"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width={20}
        >
          {categories &&
            categories?.map((data) => <Category key={data.id} data={data} />)}
        </Flex>
        <Flex width={"full"} justifyContent="center" alignItems="center" px={4}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPin />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
