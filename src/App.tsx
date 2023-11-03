import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetailPage";
import Login from "./pages/Login";
import AccountLayout from "./components/layout/AccountLayout";
import ProtectedRoute from "./components/protect/ProtectRoute";
import DashBoard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import VerifyAccount from "./pages/VerifyAccount";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/verify-account/:id" element={<VerifyAccount />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/products" element={<ProductCategory />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/products/:id" element={<ProductDetail />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout></Checkout>
              </ProtectedRoute>
            }
          ></Route>

          <Route element={<AccountLayout />}>
            <Route
              path="/account/me/:folder"
              element={
                <ProtectedRoute>
                  <DashBoard></DashBoard>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/account/login" element={<Login />}></Route>
            <Route
              path="/account/forgot-password"
              element={<ForgotPassword />}
            ></Route>
            <Route
              path="/account/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
          </Route>
          <Route path="/not-found" element={<NotFound />} />
        </Route>

        <Route path="/" element={<Navigate to={"/home"} />}></Route>
        <Route path="*" element={<Navigate to={"/not-found"} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
