import * as React from "react";
import { IDistrict, IProvince, IWard } from "../../interfaces/pdwInterface";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { countries } from "../../data/countries";
import CloseButton from "../common/CloseButton";
import userApi from "../../api/modules/userApi";
import Swal from "sweetalert2";
export interface IAddressFormProps {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setRecall: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddressForm(props: IAddressFormProps) {
  const [province, setProvince] = useState<IProvince[]>([]);
  const [district, setDistrict] = useState<IDistrict[]>([]);
  const [ward, setWard] = useState<IWard[]>([]);
  const [selectedP, setSelectedP] = useState<IProvince>();
  const [selectedD, setSelectedD] = useState<IDistrict>();
  const [selectedC, setSelectedC] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res: AxiosResponse) => setProvince(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (selectedP) {
      setValue("zipcode", "");
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedP?.code}/?depth=2`)
        .then((res: AxiosResponse) => setDistrict(res.data.districts));
    }
  }, [selectedP]);

  useEffect(() => {
    if (selectedD) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedD?.code}/?depth=2`)
        .then((res: AxiosResponse) => setWard(res.data.wards));
    }
  }, [selectedD]);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    userApi
      .updateMe({
        address: {
          country: data.country,
          province: data.province,
          district: data.district,
          ward: data.ward,
          detailAddress: data.detailAddress,
          zipcode: data.zipcode,
        },
      })
      .then(() => {
        Swal.fire("Added!", "Add new address successfully", "success").then(
          () => {
            props.setIsShowForm(false);
          }
        );
        props.setRecall(Math.random());
      })
      .catch((e) => {
        Swal.fire("Oops...!", "Something went wrong", "error");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full">
      <div
        onClick={() => props.setIsShowForm(false)}
        className="bg-gray opacity-70 top-0 left-0 w-full h-full fixed"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed bg-white top-1/2 pb-10 pt-14 px-8 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/2 max-lg:w-2/3 max-sm:w-full max-sm:h-full max-sm:overflow-y-scroll"
      >
        <div
          onClick={() => props.setIsShowForm(false)}
          className="group/x absolute top-5 right-5 border border-light rounded-full"
        >
          <CloseButton />
        </div>
        <p className="text-xl mb-8 font-semibold">New Address</p>
        <div className="mb-5">
          <FormControl error={errors.country?.type === "required"} fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              {...register("country", {
                required: true,
              })}
              label="Country"
              defaultValue={""}
              onChange={(e) => {
                setValue("country", e.target.value);
                setSelectedC(e.target.value);
              }}
            >
              {countries.map((country: any) => (
                <MenuItem value={country.name} key={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.country?.type === "required" && (
            <span className="text-error text-xs">Please provide country</span>
          )}
        </div>

        {selectedC === "Viet Nam" ? (
          <div>
            <div className="mb-5">
              <FormControl
                error={errors.province?.type === "required"}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  {...register("province", {
                    required: true,
                  })}
                  label="Province"
                  defaultValue={""}
                  onChange={(e) => {
                    setValue("province", e.target.value);
                  }}
                >
                  {province.map((province: IProvince) => (
                    <MenuItem
                      onClick={() => setSelectedP(province)}
                      value={province.name}
                      key={province.name}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.province?.type === "required" && (
                <span className="text-error text-xs">
                  Please provide province
                </span>
              )}
            </div>

            <div className="mb-5">
              <FormControl
                error={errors.district?.type === "required"}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  {...register("district", {
                    required: true,
                  })}
                  label="District"
                  defaultValue={""}
                  onChange={(e) => {
                    setValue("district", e.target.value);
                  }}
                >
                  {district.map((district: IDistrict) => (
                    <MenuItem
                      onClick={() => setSelectedD(district)}
                      value={district.name}
                      key={district.name}
                    >
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.district?.type === "required" && (
                <span className="text-error text-xs">
                  Please provide district
                </span>
              )}
            </div>
            <div className="mb-5">
              <FormControl error={errors.ward?.type === "required"} fullWidth>
                <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                <Select
                  {...register("ward", {
                    required: true,
                  })}
                  label="Ward"
                  defaultValue={""}
                  onChange={(e) => {
                    setValue("ward", e.target.value);
                  }}
                >
                  {ward.map((ward: IWard) => (
                    <MenuItem value={ward.name} key={ward.name}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.ward?.type === "required" && (
                <span className="text-error text-xs">Please provide ward</span>
              )}
            </div>
            <div className="mb-10 ">
              <TextField
                {...register("detailAddress", {
                  required: true,
                })}
                error={errors.detailAddress?.type === "required"}
                label="Detail Adress"
                variant="outlined"
                fullWidth
                onChange={(e) => setValue("detailAddress", e.target.value)}
              />
              {errors.detailAddress?.type === "required" && (
                <span className="text-error text-xs">
                  Please provide detail address
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <TextField
              {...register("zipcode", {
                required: true,
              })}
              error={errors.zipcode?.type === "required"}
              label="Zipcode"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setValue("zipcode", e.target.value);
                setValue("province", "");
                setValue("district", "");
                setValue("ward", "");
                setValue("detailAdress", "");
              }}
            />
            {errors.zipcode?.type === "required" && (
              <span className="text-error text-xs">Please provide zipcode</span>
            )}
          </div>
        )}

        <button
          disabled={isLoading}
          className="flex items-center justify-center w-full hover:bg-fresh text-white py-3 uppercase bg-black duration-300"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}
