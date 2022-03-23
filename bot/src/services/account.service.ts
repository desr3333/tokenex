import { APIService } from "@services";

export const getAll = async () => {
  try {
    const response = await APIService.get("accounts");
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const getById = async (id: number) => {
  try {
    const response = await APIService.get(`accounts/${id}`);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const create = async (data: any) => {
  try {
    const response = await APIService.post("accounts", data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const update = async (id: number, data: any) => {
  try {
    const response = await APIService.put(`accounts/${id}`, data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const remove = async (id: number) => {
  try {
    const response = await APIService.post(`accounts/${id}`);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};
