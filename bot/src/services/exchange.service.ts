import { APIService } from "@services";
import { ExchangeDto, TransactionDto } from "types";

export const createOrder = async (
  data: ExchangeDto
): Promise<TransactionDto> => {
  try {
    const response = await APIService.post("exchange", data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};
