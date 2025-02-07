import * as Yup from "yup";

const phoneNumber = Yup.string().required("Необходимо ввести номер телефона");

export const schemas = {
  custom: Yup.object().shape({
    phoneNumber,
  }),
};

export const initialValues = {
  phoneNumber: "",
};

export const initialValuesMessage = {
  message: "",
};
