import { PhoneIcon } from "@chakra-ui/icons";
import axiosAuth from "../api/axiosAuth";
import { UserForm } from "../models/UserForm.model";
import { userUpdate } from "../payloads/requests/updateRequests.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import axios from "axios";
import { UpdateUserPayload } from "../payloads/requests/updateUserRequests.model";


export const createUser = async (
  user: UserForm,
  roleId: number
): Promise<{ status: number; message: string | string[] }> => {
  try {
    const requestPayload = {
      userName: user.userName.value,
      userPassword: user.userPassword.value,
      roleId: 2,
      fullname: user.fullname.value,
      phone: user.phone.value,
      dob: user.dob.value.toISOString(),
      gender: user.gender.value,
    };

    console.log(JSON.stringify(requestPayload, null, 2));

    const response = await axiosAuth.post("/app-user", requestPayload);

    return {
      status: response.status,
      message: response.data.message || "User created successfully.",
    };
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      // Explicitly typing the errors as an object of string[] to avoid the unknown type
      const errors = error.response.data.errors as { [key: string]: string[] };
      // Create an array of error messages
      const errorMessages = Object.values(errors).flat();
      return {
        status: error.response?.status || 500,
        message: errorMessages,
      };
    }

    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred. Please try again later.",
    };
  }
};

export const getUserById = async (userId: number): Promise<ApiResponse<UserData>> => {
  try {
    const response = await axiosAuth.get(`/app-user/${userId}`);
    const apiResponse = response.data as ApiResponse<UserData>;
    return apiResponse;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred while fetching user data.",
      isSuccess: false,
      data: null,
      errors: error.response?.data?.errors || null,
    };
  }
};

export const updateUser = async (
  userId: number,
  user: UpdateUserPayload
): Promise<ApiResponse<Object>> => {
  try {
    const response = await axiosAuth.put(
      `app-user/${userId}`,
      user,
      {
        headers: {
          'User-ID': userId.toString(), // Thêm userId vào header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
