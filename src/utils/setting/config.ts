import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import authApi from "../../api/modules/authApi";
import { AxiosError, AxiosResponse } from "axios";
// import authApi from "../../api/authApi";

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime: number = Date.now(); // Convert to seconds

    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // If token decoding fails, consider it as expired
  }
}

const refreshAccessToken = async (): Promise<any> => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const response: AxiosResponse = await authApi.refreshToken(refreshToken);
      const refreshedToken: string = response.data.accessToken;
      return refreshedToken;
    }
    // Extract the refreshed access token from the response
  } catch (error: any) {
    console.log(error);

    Cookies.remove("refreshToken");
    window.location.reload();

    // Handle the token refresh error
    throw new Error("Token refresh failed");
  }
};

export { isTokenExpired, refreshAccessToken };
