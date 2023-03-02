import React, {useState} from "react";
import "./input.css";
import {Field, ErrorMessage} from "formik";

import TextError from "./TextError";
function Input(props) {
    const {
        label,
        name,
        ...rest
    } = props;


    return (
        <div className='inputBox'>
            <label htmlFor={name}
                style={
                    {
                        top: "-.01px",
                        left: "8px",
                        color: "var(--MainColor)",
                        backgroundColor: '#FFFFFF',
                        padding: '0   10px',
                        paddingBottom: '1px'

                    }
            }>
                {label} </label>
            <Field id={name}
                name={name}
                {...rest}  
                
                />
            <ErrorMessage name={name}
                component={TextError}/>
        </div>
    );
}

export default Input;
