import React, { lazy } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

const SignUpPage = lazy(() => import("./pages/SignUpPage")); 
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  return (
    <>
     <Navbar />

     <Routes>
      <Route path="/home" element={<HomePage />}  />
      <Route path="/signup" element={<SignUpPage />}  />
      <Route path="/login" element={<LoginPage />}  />
      <Route path="/settings" element={<SettingsPage />}  />
      <Route path="/profile" element={<ProfilePage />}  />

     </Routes>
    </>
  );
};

export default App;
