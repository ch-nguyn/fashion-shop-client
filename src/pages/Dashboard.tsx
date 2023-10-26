import * as React from "react";
import { useEffect, useState } from "react";
import authApi from "../api/modules/authApi";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import AccountDetails from "../components/dashboard/AccountDetails";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IUser } from "../interfaces/userInterface";
import { getUserStart } from "../features/slice/userSlice";
import ChangePassword from "../components/dashboard/ChangePassword";
import Address from "../components/dashboard/Address";

export interface IDashBoardProps {}

export default function DashBoard(props: IDashBoardProps) {
  const [current, setCurrent] = useState<string>("profile");
  const [arrCurrent, setArrCurent] = useState<any[]>([
    { icon: "user", title: "profile" },
    { icon: "clipboard", title: "order" },
    { icon: "key-skeleton", title: "change password" },
    { icon: "address-book", title: "addresses" },
  ]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isLoading, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [recall, setRecall] = useState<number>(0);

  useEffect(() => {
    dispatch(getUserStart());
  }, [isChange, recall]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  //log out
  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out now!",
    }).then((result) => {
      if (result.isConfirmed) {
        authApi
          .logout()
          .then(() =>
            Swal.fire("Success!", "Logged out!", "success").then(() => {
              navigate("/home");
              window.scrollTo(0, 0);
              localStorage.removeItem("user");
            })
          )
          .catch((e) => {
            Swal.fire("Oops...", "Something went wrong!", "error");
            console.log(e);
          });
      }
    });
  };

  return (
    <div className="mx-auto max-md:flex-wrap max-md:gap-14 max-w-[1200px] mb-24 px-5 flex gap-8">
      <div className="basis-[25%] max-md:basis-full max-md:bg-white z-10">
        {arrCurrent.map((currentPage: any) => (
          <div
            onClick={() => setCurrent(currentPage.title)}
            className={`py-4 border-t border-light cursor-pointer hover:text-fresh duration-300 capitalize font-semibold ${
              current === currentPage.title && "text-fresh"
            }`}
            key={Math.random()}
          >
            <i className={`fa-light fa-${currentPage.icon} mr-2`}></i>
            <span>{currentPage.title}</span>
          </div>
        ))}
        <div
          onClick={handleLogout}
          className={`py-4 border-y border-light cursor-pointer text-error hover:opacity-50 duration-300 capitalize font-semibold`}
          key={Math.random()}
        >
          log out
        </div>
      </div>
      <div className="basis-[75%] max-md:basis-full">
        {current === "profile" && (
          <AccountDetails setIsChange={setIsChange} isLoading={isLoading} />
        )}
        {current === "change password" && <ChangePassword />}
        {current === "addresses" && <Address setRecall={setRecall} />}
      </div>
    </div>
  );
}
