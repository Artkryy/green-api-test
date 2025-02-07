import { FC } from "react";
import { Field, ErrorMessage as Error } from 'formik'

import "./FormField.scss";

interface IFormFieldProps {
  id: string;
  component: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  helpClass?: string;
}

export const FormField: FC<IFormFieldProps> = ({ id, component, name, placeholder, type, helpClass }) => {
  return (
    <div className={`form__inp-container ${helpClass}`}>
      <Field
        name={name}
        component={component}
        type={type}
        id={id}
        placeholder={placeholder}
      />
      <Error name={name}>{(error => <span>{error}</span>)}</Error>
    </div>
  );
};
