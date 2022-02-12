import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Create, Home, Login } from "./components";
import { userAccessToken } from "./utils/fetchUser";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
};

export default App;
