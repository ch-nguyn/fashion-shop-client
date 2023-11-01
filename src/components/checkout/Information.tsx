import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useState } from "react";
import { IAddress } from "../../interfaces/userInterface";
import ChangeAddress from "./ChangeAddress";
import PaymentItem from "./PaymentItem";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import orderApi from "../../api/modules/orderApi";
import { OrderItem } from "../../interfaces/orderInterface";
import { ICart } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeCartProduct,
} from "../../features/slice/productSlice";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

export interface IInformationProps {
  currentAddress: IAddress | undefined;
  setCurrentAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>;
  shippingFee: number;
  subtotal: number;
}

export default function Information(props: IInformationProps) {
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.product);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [payment, setPayment] = useState<string>("delivery");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sdkReady, setSdkReady] = useState<boolean>(false);
  const handleCreateOrder = useCallback(() => {
    Swal.fire({
      title: "Create order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        let address: string = "";
        if (props.currentAddress?.country === "Viet Nam") {
          address = `${props.currentAddress.detailAddress}, ${props.currentAddress.ward}, ${props.currentAddress.district}, ${props.currentAddress.province}, ${props.currentAddress.country}`;
        } else {
          address = `${props.currentAddress?.country}, ${props.currentAddress?.zipcode}`;
        }
        let orderItems: OrderItem[] = [];
        cartItems.forEach((item: ICart) => {
          orderItems.push({
            product: item.product._id,
            quantity: item.quantity,
          });
        });
        orderApi
          .createOrder({
            shippingFee: props.shippingFee,
            address: address,
            cartItems: orderItems,
          })
          .then((res) => {
            dispatch(clearCart());
            Swal.fire(
              "Success",
              "Thank you for purchase our products!",
              "success"
            ).then(() => {
              navigate("/account/me/orders");
              window.scrollTo(0, 0);
            });
          })
          .catch((e) => {
            console.log(e);
            Swal.fire("Oops...!", "Something went wrong!", "error");
          })
          .finally(() => setIsLoading(false));
      }
    });
  }, [props.currentAddress]);

  const paypalOrder = useCallback(
    (details: any, data: any) => {
      let address: string = "";
      if (props.currentAddress?.country === "Viet Nam") {
        address = `${props.currentAddress.detailAddress}, ${props.currentAddress.ward}, ${props.currentAddress.district}, ${props.currentAddress.province}, ${props.currentAddress.country}`;
      } else {
        address = `${props.currentAddress?.country}, ${props.currentAddress?.zipcode}`;
      }
      let orderItems: OrderItem[] = [];
      cartItems.forEach((item: ICart) => {
        orderItems.push({
          product: item.product._id,
          quantity: item.quantity,
        });
      });
      orderApi
        .createOrder({
          shippingFee: props.shippingFee,
          address: address,
          cartItems: orderItems,
          isPaid: true,
        })
        .then((res) => {
          dispatch(clearCart());
          Swal.fire(
            "Success",
            "Thank you for purchase our products!",
            "success"
          ).then(() => {
            navigate("/account/me/orders");
            window.scrollTo(0, 0);
          });
        })
        .catch((e) => {
          console.log(e);
          Swal.fire("Oops...!", "Something went wrong!", "error");
        });
    },
    [props.currentAddress]
  );
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/v1/payment/config");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    })();
  }, []);

  return (
    <div className="pt-14 max-md:pt-6">
      {isShow && (
        <ChangeAddress
          setCurrentAddress={props.setCurrentAddress}
          setIsShow={setIsShow}
        />
      )}
      <div className="mb-8">
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
              props.currentAddress?.country === "Viet Nam" ? (
                <p className="capitalize">
                  {props.currentAddress?.detailAddress},{" "}
                  {props.currentAddress?.ward}, {props.currentAddress?.district}
                  , {props.currentAddress?.province},{" "}
                  {props.currentAddress?.country}
                </p>
              ) : (
                <div className="">
                  <p className="">
                    {props.currentAddress?.country},{" "}
                    {props.currentAddress?.zipcode}
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
      <div className="mb-8">
        <h3 className="font-semibold text-2xl mb-4">Shipping</h3>
        <div className="p-4 border border-fresh bg-light-fresh rounded flex justify-between items-center">
          <div className="flex gap-2">
            <div className="relative bg-fresh rounded-full w-5 h-5">
              <div className="absolute rounded-full w-2 h-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"></div>
            </div>
            <p>Fast</p>
          </div>
          <i className="fa-light fa-truck-fast text-fresh"></i>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold text-2xl mb-4">Payment</h3>
        <PaymentItem
          icon="fa-light fa-money-bill-wave"
          payment={payment}
          setPayment={setPayment}
          paymentMethod="delivery"
        />
        <PaymentItem
          icon="fa-brands fa-paypal"
          payment={payment}
          setPayment={setPayment}
          paymentMethod="paypal"
        />
      </div>
      <div className="mb-8">
        {payment === "delivery" ? (
          isLoading ? (
            <button className="bg-fresh text-white w-full uppercase py-3 rounded hover:bg-black duration-300">
              <CircularProgress size={16} sx={{ color: "white" }} />
            </button>
          ) : (
            <button
              className="bg-fresh text-white w-full uppercase py-3 rounded hover:bg-black duration-300"
              onClick={handleCreateOrder}
            >
              Create Order
            </button>
          )
        ) : (
          <PayPalButton
            amount={props.subtotal + props.shippingFee}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

            onSuccess={paypalOrder}
            onError={() =>
              Swal.fire("Oops...!", `Something went wrong!`, "error")
            }
          />
        )}
      </div>
    </div>
  );
}
