import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authApi from "../api/modules/authApi";
import Swal from "sweetalert2";

export interface IVerifyAccountProps {}

export default function VerifyAccount(props: IVerifyAccountProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      authApi
        .verifyAccount(id)
        .then(() =>
          Swal.fire(
            "Success!",
            "Your account has been verified!",
            "success"
          ).then(() => navigate("/account/login"))
        )
        .catch((e) => {
          Swal.fire("Oops...!", "Something went wrong", "error");
          console.log(e);
        });
    }
  }, []);
  return <div></div>;
}
