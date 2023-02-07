import React from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Links from "./pages/Links";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import AdminProfile from "./pages/AdminProfile";
import UserProfile from "./pages/UserProfile";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/hooks/RequireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="links" element={<Links />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedStatuses={["user", "admin"]} />}>
          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedStatuses={["admin"]} />}>
          <Route path="admin" element={<AdminProfile />} />
        </Route>
        <Route element={<RequireAuth allowedStatuses={["user"]} />}>
          <Route path="user" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
