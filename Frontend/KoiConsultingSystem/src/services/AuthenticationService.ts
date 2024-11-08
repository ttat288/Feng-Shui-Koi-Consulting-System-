import axios from "axios";
import axiosLogin from "../api/axiosLogin";
import { LoginResponse } from "../payloads/responses/LoginResponse.model";

export const login = async (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const res = await axiosLogin.post("authentication/login", {
      username: userName, // kiểm tra xem backend mong đợi username hay userName
      password: password,
    });
    
    const apiResponse = res.data as LoginResponse;
    
    // Kiểm tra dữ liệu trả về
    console.log("API response:", apiResponse);
    return apiResponse;
  } catch (error) {
    // Xử lý lỗi
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // Đảm bảo lỗi được ném ra để xử lý ở nơi gọi
  }
};

export const refreshToken = async (): Promise<string | undefined> => {
  try {
    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");

    if (!accessToken || !refreshToken) {
      return undefined;
    }

    const res = await axiosLogin.post("authentication/refresh-token", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    if (res.status === 200) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        res.data.data;
      localStorage.setItem("AccessToken", newAccessToken);
      localStorage.setItem("RefreshToken", newRefreshToken);
      return newAccessToken;
    }

    return undefined;
  } catch (error) {
    console.error("Refresh token error:", error);
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    return undefined;
  }
};
