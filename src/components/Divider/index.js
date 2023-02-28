import React from "react";
import clsx from "clsx";
import "./style.scss";

const Divider = ({ className }) => {
  return <div className={clsx("divider", className)}></div>;
};

export default Divider;
