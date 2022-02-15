import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Category, Create, Feed, NavBar } from ".";
import { fetchUser } from "../utils/fetchUser";
const [userInfo] = fetchUser();

const Home = () => {
  const [user, setUser] = useState(userInfo);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
};

export default Home;
