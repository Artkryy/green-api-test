import * as Yup from "yup";

const idInstance = Yup.string().required("Введите IDInstance");

const apiTokenInstance = Yup.string().required("Введите ApiTokenInstance");

export const schemas = {
  custom: Yup.object().shape({
    idInstance,
    apiTokenInstance,
  }),
};

export const initialValues = {
  idInstance: "",
  apiTokenInstance: "",
};
