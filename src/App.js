import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Create, Home, Login } from "./components";
import { userAccessToken } from "./utils/fetchUser";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login setUser={setUser} />} />
      <Route path="/*" element={<Home user={user} />} />
    </Routes>
  );
};

export default App;
