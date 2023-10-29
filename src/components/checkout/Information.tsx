import * as React from "react";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { IAddress } from "../../interfaces/userInterface";
import ChangeAddress from "./ChangeAddress";

export interface IInformationProps {}

export default function Information(props: IInformationProps) {
  const { user } = useAppSelector((state) => state.user);
  const [currentAddress, setCurrentAddress] = useState<IAddress>();
  useEffect(() => {
    if (user.address) {
      setCurrentAddress(user.address[0]);
    }
  }, [user]);
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="pt-14">
      {isShow && (
        <ChangeAddress
          setCurrentAddress={setCurrentAddress}
          setIsShow={setIsShow}
        />
      )}
      <div className="mb-5">
        <h3 className="font-semibold text-2xl mb-4">Contact</h3>
        <div className="flex gap-4 justify-between mb-2">
          <p className="basis-2/5">Email:</p>{" "}
          <span className="basis-3/5 text-end">{user.email}</span>
        </div>{" "}
        <div className="flex gap-4 justify-between mb-2">
          <p className="basis-2/5">Phone number:</p>{" "}
          <span className="basis-3/5 text-end">{user.phoneNumber}</span>
        </div>
        <div className="flex gap-4 justify-between mb-2">
          <p className="basis-2/5">Address:</p>
          <div className="basis-3/5 text-end">
            {user.address ? (
              currentAddress?.country === "Viet Nam" ? (
                <p className="capitalize">
                  {currentAddress?.detailAddress}, {currentAddress?.ward},{" "}
                  {currentAddress?.district}, {currentAddress?.province},{" "}
                  {currentAddress?.country}
                </p>
              ) : (
                <div className="">
                  <p className="">
                    {currentAddress?.country}, {currentAddress?.zipcode}
                  </p>
                </div>
              )
            ) : (
              <p>You do not have an address</p>
            )}

            <p
              onClick={() => setIsShow(true)}
              className="text-fresh inline cursor-pointer text-xs relative group"
            >
              Change Address <i className="fa-light fa-pen-to-square"></i>
              <span className="w-0 group-hover:w-full duration-300 h-[2px] bg-fresh absolute -bottom-1 left-0"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
