import React from "react";

function TextError(props) {
  return (
    <div style={{ paddingLeft: "10px", color: "rgb(255, 66, 66)"   ,margin:'8px'   }}>
      {props.children}
    </div>
  );
}

export default TextError;
