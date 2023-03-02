import React from "react";
import { Link } from "react-router-dom";
import "./profileFooter.css";
function ProfileFooter() {
  return (
    <footer>
      <div className='copy-right'>
        <h5> 	&#169; 2023 Université mascara | All rights reserved | <Link to="faq" >FAQ</Link>  </h5>
      </div>
    </footer>
  );
}

export default ProfileFooter;
