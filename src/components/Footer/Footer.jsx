import React from "react";
import style from "./Footer.module.css";

const Footer = ({ children }) => {
  return <div className={style.footer}>{children}</div>;
};

export default Footer;
