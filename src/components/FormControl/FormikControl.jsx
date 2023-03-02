import React from "react";
import Input from "./input";
import TextArea from "./textArea";



function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea" :
      return <TextArea  {...rest}   /> ; 
    default:
      return null;
  }
}

export default FormikControl;
