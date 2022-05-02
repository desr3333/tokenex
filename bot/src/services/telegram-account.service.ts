import { APIService } from "@services";

export const getByChatId = async (chatId: number) => {
  try {
    const response = await APIService.get(`telegram-accounts/@${chatId}`);
    return response.data?.result;
  } catch (e) {
    // console.log(e.response?.data);
    return null;
  }
};

export const create = async (data: any) => {
  try {
    const response = await APIService.post("telegram-accounts", data);
    return response.data?.result;
  } catch (e) {
    return null;
  }
};

export const update = async (id: number, data: any) => {
  try {
    const response = await APIService.put(`telegram-accounts/${id}`, data);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};

export const remove = async (id: number) => {
  try {
    const response = await APIService.delete(`telegram-accounts/${id}`);
    return response.data?.result;
  } catch (e) {
    console.log(e.response?.data);
  }
};
