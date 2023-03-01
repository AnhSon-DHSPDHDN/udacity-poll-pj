import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const TabsLink = ({ links = [] }) => {
  const { pathname } = useLocation();

  return (
    <div className="tab-wrapper">
      {links.map((link) => (
        <Link
          key={link.to}
          className={clsx("tab-item", {
            "tab-item--active": pathname === link.to,
          })}
          to={link.to}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default TabsLink;
