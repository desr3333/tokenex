import { APIService } from "@services";
import { TransactionDto } from "types";

export const getAll = async () => {
  try {
    const response = await APIService.get("wallets");
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const getById = async (id: number) => {
  try {
    const response = await APIService.get(`wallets/${id}`);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const create = async (data: any) => {
  try {
    const response = await APIService.post("wallets", data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const update = async (id: number, data: any) => {
  try {
    const response = await APIService.put(`wallets/${id}`, data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const remove = async (id: number) => {
  try {
    const response = await APIService.post(`wallets/${id}`);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const calculateTx = async (
  transactionDto: TransactionDto
): Promise<TransactionDto> => {
  try {
    const response = await APIService.post(
      `wallets/calculateTx`,
      transactionDto
    );
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const withdraw = async (withdrawDto: TransactionDto) => {
  try {
    const response = await APIService.post(`wallets/withdraw`, withdrawDto);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};
