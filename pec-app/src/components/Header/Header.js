import React from "react";
import "./Header.css";
import ButtonBox from "../../shared/ButtonBox/ButtonBox";
function Header() {
  const sayHello = () => {
    console.log("hello");
  };
  return (
    <div className="header">
      <div className="logo">
        {/* <ButtonBox title="pec" color="#4F75FB" funct={sayHello} /> */}
        {/* <div>PEC</div> */}
      </div>
    </div>
  );
}

export default Header;
