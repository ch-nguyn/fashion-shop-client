import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../../utils/setting/config";

const privateClient: AxiosInstance = axios.create({
  baseURL: `/api/v1`,
});

privateClient.interceptors.request.use(
  async function (config: any) {
    // Thực hiện kịch bản gì đó trước khi gửi
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const newHeaders = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      config = {
        ...config,
        headers: newHeaders,
      };
    } else {
      try {
        const newAccessToken = await refreshAccessToken();
        const newHeaders = {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        };
        config = {
          ...config,
          headers: newHeaders,
        };
      } catch (e) {
        console.log(e);
      }
    }
    return config;
  },
  function (error) {
    // Thực hiện kịch bản gì đó khi yêu cầu bị lỗi
    console.log(2);

    return Promise.reject(error);
  }
);

export default privateClient;
