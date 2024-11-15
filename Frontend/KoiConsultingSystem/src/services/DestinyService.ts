import axiosAuth from "../api/axiosAuth";

export const calculateDestiny = async (
  year: number
): Promise<{ status: number; message: string; destinyData: DestinyResponse | null }> => {
  try {
    const response = await axiosAuth.get(`/Destiny/calculate?year=${year}`);
    const destinyResponse = response.data as DestinyResponse;

    return {
      status: response.status,
      message: destinyResponse.message || "Destiny calculated successfully.",
      destinyData: destinyResponse,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred while calculating destiny.",
      destinyData: null,
    };
  }
};
