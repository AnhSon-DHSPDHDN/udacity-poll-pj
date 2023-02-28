import React from "react";
import { Link } from "react-router-dom";

const TabsLink = ({ links = [] }) => {
  return (
    <div className="tab-wrapper">
      {links.map((link) => (
        <Link key={link.to} className="tab-item" to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default TabsLink;
