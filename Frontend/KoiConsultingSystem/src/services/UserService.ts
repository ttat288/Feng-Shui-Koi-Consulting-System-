import axiosAuth from "../api/axiosAuth";
import { UserForm } from "../models/UserForm.model";
import { UpdateUserPayload } from "../payloads/requests/updateUserRequests.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";

// Create User
export const createUser = async (
  user: UserForm,
  roleId: number
): Promise<{ status: number; message: string | string[] }> => {
  try {
    const requestPayload = {
      userName: user.userName.value,
      userPassword: user.userPassword.value,
      roleId,
      fullname: user.fullname.value,
      phone: user.phone.value,
      dob: user.dob.value.toISOString(),
      gender: user.gender.value,
    };
    const response = await axiosAuth.post("/app-user", requestPayload);
    return {
      status: response.status,
      message: response.data.message || "User created successfully.",
    };
  } catch (error: any) {
    const errorMessages = error.response?.data.errors
      ? Object.values(error.response.data.errors).flat()
      : error.response?.data?.message || "An error occurred. Please try again.";
    return {
      status: error.response?.status || 500,
      message: errorMessages,
    };
  }
};

// Get User by ID
export const getUserById = async (
  userId: number
): Promise<ApiResponse<UserData>> => {
  try {
    const response = await axiosAuth.get(`/app-user/${userId}`);
    return response.data as ApiResponse<UserData>;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching user data.",
      isSuccess: false,
      data: null,
      errors: error.response?.data?.errors || null,
    };
  }
};

// Update User
export const updateUser = async (
  userId: number,
  user: UpdateUserPayload
): Promise<ApiResponse<Object>> => {
  try {
    const response = await axiosAuth.put(`/app-user/${userId}`, user, {
      headers: { "User-ID": userId.toString() },
    });
    return response.data;
  } catch (error: any) {
    throw {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "An error occurred while updating user.",
    };
  }
};

// Get All Users
export const getAllUsers = async (): Promise<ApiResponse<UserData[]>> => {
  try {
    const response = await axiosAuth.get("/app-users");
    return response.data as ApiResponse<UserData[]>;
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching users.",
      isSuccess: false,
      data: null,
      errors: error.response?.data?.errors || null,
    };
  }
};

// Delete User
export const deleteUser = async (
  userId: number
): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosAuth.delete(`/app-user/${userId}`);
    return {
      statusCode: response.status,
      message: response.data.message || "User deleted successfully.",
      isSuccess: true,
      data: null,
      errors: null,
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "An error occurred while deleting user.",
      isSuccess: false,
      data: null,
      errors: error.response?.data?.errors || null,
    };
  }
};

// Activate or Deactivate User
export const activateUser = async (
  userId: number,
  isActive: boolean
): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosAuth.patch(`/app-user/${userId}/activate`, {
      isActive,
    });
    return {
      statusCode: response.status,
      message:
        response.data.message ||
        `User ${isActive ? "activated" : "deactivated"} successfully.`,
      isSuccess: true,
      data: null,
      errors: null,
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "An error occurred while updating user status.",
      isSuccess: false,
      data: null,
      errors: error.response?.data?.errors || null,
    };
  }
};
