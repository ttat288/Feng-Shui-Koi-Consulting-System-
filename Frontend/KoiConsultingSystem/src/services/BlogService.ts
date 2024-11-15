import axiosAuth from "../api/axiosAuth";
import { BlogResponse } from "../payloads/responses/Blog.model";

export const getBlog = async (): Promise<BlogResponse> => {
  try {
    const response = await axiosAuth.get("/Blog");
    const apiResponse = response.data as BlogResponse;

    return {
      statusCode: apiResponse.statusCode,
      message: apiResponse.message,
      data: apiResponse.data,
    };
  } catch (error: any) {
    console.error("Error fetching blog data:", error);

    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred while fetching blog data.",
      data: [],
    };
  }
};

export const getBlogById = async (id: number): Promise<BlogResponse> => {
    try {
      const response = await axiosAuth.get(`/Blog/${id}`);
      const apiResponse = response.data as BlogResponse;
  
      return {
        statusCode: apiResponse.statusCode,
        message: apiResponse.message,
        data: apiResponse.data,
      };
    } catch (error: any) {
      console.error(`Error fetching blog data with id ${id}:`, error);
  
      return {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || "An error occurred while fetching blog data.",
        data: [],
      };
    }
  };