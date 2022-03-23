import { APIService } from "@services";

export const create = async () => {
  try {
    const response = await APIService.post("eth");
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const getBalance = async (address: string) => {
  try {
    const response = await APIService.get(`eth/${address}/balance`);
    return response.data.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};
