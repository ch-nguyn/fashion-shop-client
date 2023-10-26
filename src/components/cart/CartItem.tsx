import * as React from "react";
import { ICart } from "../../interfaces/productInterface";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  addToCart,
  minusOneItem,
  removeCartProduct,
} from "../../features/slice/productSlice";
import { useAppSelector } from "../../store/hooks";

export interface ICartItemProps {
  cartItem: ICart;
  dispatch: any;
}

function CartItem(props: ICartItemProps) {
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    props.cartItem.product.discountPrice
      ? setMoney(Number(props.cartItem.product.discountPrice))
      : setMoney(Number(props.cartItem.product.price));
  }, [props.cartItem]);

  const handleRemoveItem = () => {
    Swal.fire({
      title: "Do you want to remove it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0cc3ce",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.dispatch(removeCartProduct(props.cartItem));
        Swal.fire("Removed!", "Your cart product has been removed.", "success");
      }
    });
  };

  const handleMinusItem = () => {
    if (props.cartItem.quantity > 1) {
      props.dispatch(minusOneItem(props.cartItem));
    } else {
      Swal.fire({
        title: "Do you want to remove it?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0cc3ce",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then((result) => {
        if (result.isConfirmed) {
          props.dispatch(removeCartProduct(props.cartItem));
          Swal.fire(
            "Removed!",
            "Your cart product has been removed.",
            "success"
          );
        }
      });
    }
  };

  const handleAddItem = () => {
    props.dispatch(addToCart({ product: props.cartItem.product, quantity: 1 }));
  };
  return (
    <div className="py-4 flex max-md:gap-5 items-center max-md:flex-wrap">
      <div className="basis-1/2 max-md:basis-full flex items-center gap-5">
        <div className="basis-1/4 max-sm:basis-1/2">
          <img src={props.cartItem.product.photo[0]} alt="" />
        </div>
        <div className="basis-3/4 max-sm:basis-1/2">
          <p className="mb-2">{props.cartItem.product.name}</p>
          <p className=" text-gray text-sm">${money.toFixed(2)}</p>
        </div>
      </div>
      <div className="basis-1/2 max-md:basis-full max-md:justify-between flex">
        <div className="basis-1/2 max-md:basis-1/4 max-sm:basis-1/2 flex justify-center items-center flex-col">
          <div className="flex border border-light mb-2 items-center">
            <div onClick={handleMinusItem}>
              <i className="fa-regular fa-minus text-gray hover:text-fresh cursor-pointer px-5 py-2"></i>
            </div>
            <span className="text-sm px-1">{props.cartItem.quantity}</span>
            <div onClick={handleAddItem}>
              <i className="fa-regular fa-plus text-gray hover:text-fresh cursor-pointer px-5 py-2"></i>
            </div>
          </div>
          <span
            onClick={handleRemoveItem}
            className="text-xs text-center text-gray underline hover:text-error cursor-pointer"
          >
            Remove
          </span>
        </div>
        <div className="basis-1/2 flex justify-end font-medium items-center">
          ${(props.cartItem.quantity * money).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
