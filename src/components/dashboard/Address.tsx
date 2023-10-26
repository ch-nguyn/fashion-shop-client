import * as React from "react";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../store/hooks";
import AddressForm from "./AddressForm";
import Swal from "sweetalert2";
import userApi from "../../api/modules/userApi";

export interface IAddressProps {
  setRecall: React.Dispatch<React.SetStateAction<number>>;
}

export default function Address(props: IAddressProps) {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      <p className="text-gray mb-1 ">
        The following addresses will be used on the checkout page by default.
      </p>
      <h3 className="font-semibold text-2xl mb-3">Shipping address</h3>
      {user.address?.length === 0 ? (
        <div className="mb-3">
          <i className="text-gray text-sm ">You does not have any addresses</i>
        </div>
      ) : (
        <div className="mb-5">
          {user.address ? (
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
          )}
        </div>
      )}
      <div>
        <button
          onClick={() => setIsShowForm(true)}
          className="bg-fresh text-white py-2 px-5 hover:opacity-60 duration-300 capitalize"
        >
          {user.address?.length === 0 ? (
            <i className="fa-regular fa-plus mr-2 "></i>
          ) : (
            ""
          )}
          {user.address?.length === 0 ? "add address" : "change address"}
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
