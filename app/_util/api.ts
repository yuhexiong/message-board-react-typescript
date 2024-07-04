import axios, { AxiosResponse } from "axios";
import { MessageData } from "./interface";

const API_URL = 'http://localhost:8080'

export const getMessageApi = async (): Promise<MessageData[]> => {
  try {
    const response: AxiosResponse<MessageData[]> = await axios.get(API_URL + '/messages');
    return response.data;
  } catch (error: any) {
    throw new Error(`Error getting messages ${error.message}`);
  }
};

export const postMessageApi = async (message: string) => {
  try {
    await axios.post(API_URL + '/message', {
      name: 'test',
      message: message,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    throw new Error(`Error posting messages ${error.message}`);
  }
};

export const deleteMessageApi = async (id: number) => {
  try {
    await axios.delete(API_URL + '/message/' + id);
  } catch (error: any) {
    throw new Error(`Error deleting messages ${error.message}`);
  }
};
