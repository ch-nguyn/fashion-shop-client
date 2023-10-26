import * as React from "react";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import authApi from "../../api/modules/authApi";
import HeaderMobile from "../common/HeaderMobile";

export interface IMainLayoutProps {}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <Header />
      <HeaderMobile />
      <Outlet />
      <Footer />
    </>
  );
}
