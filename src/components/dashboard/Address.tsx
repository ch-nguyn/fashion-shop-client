import * as React from "react";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../store/hooks";
import AddressForm from "./AddressForm";
import Swal from "sweetalert2";
import userApi from "../../api/modules/userApi";
import { IAddress } from "../../interfaces/userInterface";
import { AxiosResponse } from "axios";

export interface IAddressProps {
  setRecall: React.Dispatch<React.SetStateAction<number>>;
}

export default function Address(props: IAddressProps) {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const handleDeleteAddress = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userApi
          .deleteAddress(id)
          .then((res: AxiosResponse) => {
            Swal.fire("Deleted!", "Your review has been deleted!", "success");
            props.setRecall(Math.random());
          })
          .catch((e) => {
            console.log(e);
            Swal.fire("Oops...!", "Something went wrong", "error");
          });
      }
    });
  };

  return (
    <div>
      <p className="text-gray mb-4 ">
        The following addresses will be used on the checkout page by default.
      </p>
      <h3 className="font-semibold text-2xl mb-6">Shipping addresses</h3>
      {user.address?.length === 0 ? (
        <div className="mb-3">
          <i className="text-gray text-sm ">You does not have any addresses</i>
        </div>
      ) : (
        <div className="mb-5">
          {/* {user.address ? (
            user.address[0].country === "Viet Nam" ? (
              <i className="capitalize text-gray">
                <p>
                  <i>{user.address[0].detailAddress},</i>
                </p>
                {user.address[0].ward}, {user.address[0].district},{" "}
                {user.address[0].province}, {user.address[0].country}
              </i>
            ) : (
              <div className="mb-5">
                <i className="text-gray">
                  {user.address[0].country}, {user.address[0].zipcode}
                </i>
              </div>
            )
          ) : (
            ""
          )} */}
          {user.address?.map((singleAddress: IAddress) =>
            singleAddress.country === "Viet Nam" ? (
              <div
                className="capitalize py-5 px-3 border mb-5 flex items-center justify-between gap-10"
                key={Math.random()}
              >
                <div>
                  <p>
                    <span>{singleAddress.detailAddress},</span>
                  </p>
                  <p>
                    {singleAddress.ward}, {singleAddress.district},{" "}
                    {singleAddress.province}, {singleAddress.country}
                  </p>
                </div>
                <div
                  onClick={() => handleDeleteAddress(singleAddress._id)}
                  className="mx-5 text-error h-full cursor-pointer"
                >
                  <i className="fa-light fa-trash-xmark text-xl"></i>
                </div>
              </div>
            ) : (
              <div
                className=" py-5 px-3 border mb-5 flex justify-between items-center gap-10 "
                key={Math.random()}
              >
                <div className="">
                  {singleAddress.country}
                  <p>Zipcode: {singleAddress.zipcode}</p>
                </div>
                <div
                  onClick={() => handleDeleteAddress(singleAddress._id)}
                  className="mx-5 text-error h-full cursor-pointer"
                >
                  <i className="fa-light fa-trash-xmark text-xl"></i>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div>
        <button
          onClick={() => setIsShowForm(true)}
          className="bg-fresh text-white py-2 px-5 hover:opacity-60 duration-300 capitalize"
        >
          <i className="fa-regular fa-plus mr-2 "></i>
          add address
        </button>
      </div>
      {isShowForm && (
        <AddressForm
          setRecall={props.setRecall}
          setIsShowForm={setIsShowForm}
        />
      )}
    </div>
  );
}
