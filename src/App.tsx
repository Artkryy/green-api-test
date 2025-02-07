import { FC, useEffect, useState } from "react";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { changeSettings, getSettings, receiveNotification } from "./api/api";
import { Message } from "./interfaces/message";

export const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [idInstance, setIdInstance] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleLogin = async (id: string, token: string) => {
    try {
      setIsLoading(true)
      setIdInstance(id);
      setApiTokenInstance(token);
      await getSettings(id, token);
      await changeSettings(id, token)
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;

    const interval = setInterval(async () => {
      await receiveNotification(idInstance, apiTokenInstance, setChatMessages);
    }, 5000);

    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);


  return (
    <div className="main">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <Chat
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      )}
    </div>
  );
};
