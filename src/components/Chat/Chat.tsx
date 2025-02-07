import { FC, useState } from "react";
import { sendMessage } from "../../api/api";
import { Message } from "../../interfaces/message";
import { ErrorMessage as Error, Field, FieldProps, Form, Formik } from "formik";
import { Button } from "../../ui/Button";
import { initialValues, initialValuesMessage, schemas } from "./helper";
import { IMaskInput } from "react-imask";
import { cleanPhoneNumber } from "../../utils/utils";

import './Chat.scss'

interface IChatProps {
  idInstance: string;
  apiTokenInstance: string;
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const Chat: FC<IChatProps> = ({ idInstance, apiTokenInstance, chatMessages, setChatMessages }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [visiblePhoneInput, setVisiblePhoneInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartChat = async () => {
    setVisiblePhoneInput(false)
  }

  const handleExitChat = () => {
    setVisiblePhoneInput(true)
    setChatMessages([])
  }

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true)
      await sendMessage(idInstance, apiTokenInstance, phoneNumber, message)

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: message, fromMe: true },
      ]);

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!visiblePhoneInput ? (
        <div className="main__chat-wrap chat">
          <button className="main__back-btn btn" onClick={handleExitChat}>
            Назад
          </button>
          <div className="chat__messages messages">
            <div className="messages__message-wrap">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`messages__message ${msg.fromMe ? 'me' : 'not-me'}`}
                >
                  <p className="messages__text">{msg.text}</p>
                </div>
              ))}
              <div className="messages__bg">
              </div>
            </div>
          </div>
          <Formik
            initialValues={initialValuesMessage}
            onSubmit={({ message }, { resetForm }) => {
              handleSendMessage(message)
              resetForm()
            }}
          >
            {({ handleSubmit }) => (
              <Form className="chat__send-wrap">
                <div className="chat__inp-container">
                  <Field name="message">
                    {({ field }: FieldProps) => (
                      <textarea
                        {...field}
                        className="chat__textarea"
                        placeholder="Введите сообщение"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit()
                          }
                        }}
                      />
                    )}
                  </Field>
                </div>
                <Button
                  className="chat__btn btn"
                  type="submit"
                  isLoading={isLoading}
                  value="Отправить"
                />
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="main__form-wrap main__form-wrap--phone">
          <Formik
            initialValues={initialValues}
            validationSchema={schemas.custom}
            onSubmit={({ phoneNumber }) => {
              setPhoneNumber(cleanPhoneNumber(phoneNumber))
              handleStartChat()
            }}
          >
            <Form className="main__form form">
              <h2 className="form__title">Начать чат</h2>
              <div className='form__inp-container'>
                <Field
                  name="phoneNumber"
                  id="phoneNumber"
                >
                  {({ field }: FieldProps<string>) => (
                    <IMaskInput
                      {...field}
                      type="text"
                      mask="+{7}(000)000-00-00"
                      className="phoneNumber"
                      placeholder="+7(___)___-__-__"
                    />
                  )}
                </Field>
                <Error name='phoneNumber'>{(error) => <span>{error}</span>}</Error>
              </div>
              <Button
                className="form__btn btn"
                value="Войти"
                type="submit"
              />
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
}
