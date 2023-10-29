import * as React from "react";
import CloseButton from "../common/CloseButton";
import { useAppSelector } from "../../store/hooks";
import { IAddress } from "../../interfaces/userInterface";

export interface IChangeAddressProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>;
}

export default function ChangeAddress(props: IChangeAddressProps) {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="">
      <div
        onClick={() => props.setIsShow(false)}
        className="fixed h-full w-full bg-gray opacity-70 top-0 left-0 z-40"
      ></div>
      <div className="bg-white z-50 fixed top-1/2 animate-[slip_0.5s_ease-in-out] left-1/2 w-1/2 max-sm:overflow-y-scroll max-xl:w-2/3 max-sm:w-full max-sm:h-full translate-x-[-50%] translate-y-[-50%] px-8 pb-10 pt-14">
        <div
          onClick={() => props.setIsShow(false)}
          className="group/x absolute top-5 right-5 border border-light rounded-full"
        >
          <CloseButton />
        </div>
        <div className="text-xl border-b border-light pb-2 mb-5">
          Your address
        </div>
        <div>
          {user.address?.map((singleAddress: IAddress) =>
            singleAddress.country === "Viet Nam" ? (
              <div
                onClick={() => {
                  props.setCurrentAddress(singleAddress);
                  props.setIsShow(false);
                }}
                className="capitalize py-5 px-3 border mb-5 flex items-center justify-between gap-10 cursor-pointer hover:bg-extra-light duration-300"
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
              </div>
            ) : (
              <div
                onClick={() => {
                  props.setCurrentAddress(singleAddress);
                  props.setIsShow(false);
                }}
                className=" py-5 px-3 border mb-5 flex justify-between items-center gap-10  cursor-pointer hover:bg-extra-light duration-300"
                key={Math.random()}
              >
                <div className="">
                  {singleAddress.country}
                  <p>Zipcode: {singleAddress.zipcode}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
