import { PhoneIcon } from "@chakra-ui/icons";
import axiosAuth from "../api/axiosAuth";
import { UserForm } from "../models/UserForm.model";
import { userUpdate } from "../payloads/requests/updateRequests.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { UserData } from "../payloads/responses/UserData.model";
import axios from "axios";

export const getUsers = async (
  currentPage: number,
  rowsPerPage: number,
  searchValue: string
): Promise<GetData<UserData>> => {
  const res = await axiosAuth.get("app-users", {
    params: {
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      searchKey: searchValue,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<UserData>;
};

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



export const getUser = async (id: number): Promise<ApiResponse<UserData>> => {
  const res = await axiosAuth.get("app-user/get-by-id", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<UserData>;
  return apiResponse;
};

export const updateUser = async (
  id: number,
  user: userUpdate
): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.put(`app-user?id=${id}`, user);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const deleteUser = async (id: number): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete("app-user", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
