import axios from "axios";
import { Message, ServerResponse } from "../interfaces/message";

export const API_URL = "https://1103.api.green-api.com";

export const getSettings = async (
  idInstance: string,
  apiTokenInstance: string,
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка получения настроек", error);
  }
};

export const changeSettings = async (
  idInstance: string,
  apiTokenInstance: string,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/setSettings/${apiTokenInstance}`,
      {
        webhookUrl: "",
        outgoingWebhook: "yes",
        stateWebhook: "yes",
        incomingWebhook: "yes",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка изменения настроек", error);
  }
};

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
  message: string,
): Promise<ServerResponse | null> => {
  try {
    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${chatId}@c.us`,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.idMessage;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string,
) => {
  try {
    await axios.delete(
      `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    );
  } catch (error) {
    console.error("Ошибка при удалении уведомления", error);
  }
};

export const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.data) {
      return null;
    }

    const { receiptId, body } = response.data;

    if (!receiptId) {
      return null;
    }

    if (
      body?.typeWebhook === "incomingMessageReceived" &&
      body?.messageData?.typeMessage === "extendedTextMessage"
    ) {
      const newMessage: Message = {
        text: body.messageData.extendedTextMessageData.text,
        fromMe: false,
      };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      await deleteNotification(idInstance, apiTokenInstance, receiptId);
    }

    if (
      body?.typeWebhook === "outgoingMessageReceived" &&
      body?.messageData?.typeMessage === "textMessage"
    ) {
      const newMessage: Message = {
        text: body.messageData.textMessageData.textMessage,
        fromMe: true,
      };

      setChatMessages((prevMessages) => [...prevMessages, newMessage]);

      await deleteNotification(idInstance, apiTokenInstance, receiptId);
    }
    await deleteNotification(idInstance, apiTokenInstance, receiptId);
  } catch (error) {
    console.error(error);
  }
};
