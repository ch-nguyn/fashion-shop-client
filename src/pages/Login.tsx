import * as React from "react";
import { useEffect, useState } from "react";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ILogin } from "../interfaces/authInterface";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [status, setStatus] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("refreshToken")) navigate("/account/me");
  }, []);
  const [login, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });

  return (
    <div className="">
      <div className="mx-auto max-w-[1200px] flex justify-center mb-24">
        <div className="basis-1/2 max-lg:basis-2/3 max-sm:basis-full max-sm:border-0  overflow-hidden px-14 max-sm:px-5 border">
          <div className="flex justify-center items-center gap-14 mt-20 mb-20 max-sm:mt-10 max-sm:mb-8">
            <p
              onClick={() => {
                setStatus("login");
              }}
              className={`uppercase font-semibold cursor-pointer text-lg ${
                status === "login" ? "opacity-100" : "opacity-30"
              }`}
            >
              log in
            </p>
            <p
              onClick={() => {
                setStatus("signup");
                setLogin({
                  email: "",
                  password: "",
                });
              }}
              className={`uppercase font-semibold cursor-pointer text-lg ${
                status === "signup" ? "opacity-100" : "opacity-30"
              }`}
            >
              sign up
            </p>
          </div>
          <div className="pt-2 overflow-hidden">
            <div
              className={`w-[200%] relative flex duration-500 ease-in-out ${
                status === "signup" && "translate-x-[-50%]"
              }`}
            >
              <div className="basis-full mx-4">
                <LoginForm
                  login={login}
                  setLogin={setLogin}
                  setStatus={setStatus}
                />
              </div>
              <div className="basis-full mx-4 mb-24">
                <SignupForm setStatus={setStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
