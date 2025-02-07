import { FC } from "react";
import { Form, Formik } from "formik";
import { Button } from "../../ui/Button";
import { FormField } from "../../ui/FormField";
import { initialValues, schemas } from "./helper";

import './Login.scss';

interface ILoginProps {
  isLoading: boolean;
  onLogin: (idInstance: string, apiTokenInstance: string) => void
}

export const Login: FC<ILoginProps> = ({ isLoading, onLogin }) => {

  const handleSubmitForm = (idInstance: string, apiTokenInstance: string, resetForm: () => void) => {
    onLogin(idInstance, apiTokenInstance);
    resetForm()
  };

  return (
    <div className="main__form-wrap">
      <Formik
        initialValues={initialValues}
        validationSchema={schemas.custom}
        onSubmit={({ idInstance, apiTokenInstance }, { resetForm }) => {
          handleSubmitForm(idInstance, apiTokenInstance, resetForm)
        }}>
        <Form className="main__form form">
          <h1 className="form__title">Вход в инстанс GREEN-API</h1>
          <div className="form__input-wrap">
            <FormField
              component="input"
              id="idInstance"
              name="idInstance"
              type="text"
              placeholder="ID Instance"
              helpClass=""
            />
            <FormField
              component="input"
              id="apiTokenInstance"
              name="apiTokenInstance"
              helpClass=""
              type="text"
              placeholder="API Token Instance"
            />
          </div>
          <Button
            className="form__btn btn"
            value="Войти"
            type="submit"
            isLoading={isLoading}
          />
        </Form>
      </Formik>
    </div >
  );
}
