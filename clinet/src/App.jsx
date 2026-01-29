import React, { lazy } from "react";
import "@mantine/core/styles.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense } from "react";

const Navbar = lazy(() => import("./components/Navbar.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const HeroSection = lazy(() => import("./components/HeroSection.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes.jsx"));

function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Suspense>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HeroSection />} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
