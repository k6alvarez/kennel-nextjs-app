import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);

  let className = child.props.className || "";

  const checkRoutePaths = () => {
    let activeRouteCheck = false;

    if (router.pathname === props.href) {
      activeRouteCheck = true;
    }

    if (router.pathname === "/training-class" && props.href === "/training") {
      activeRouteCheck = true;
    }

    if (router.pathname === "/classes-manager" && props.href === "/admin") {
      activeRouteCheck = true;
    }

    if (router.pathname === "/permissions" && props.href === "/admin") {
      activeRouteCheck = true;
    }

    if (router.pathname === "/client-reservations" && props.href === "/admin") {
      activeRouteCheck = true;
    }

    if (router.pathname === "/app-settings" && props.href === "/admin") {
      activeRouteCheck = true;
    }

    if (router.pathname === "/pet" && props.href === "/pets") {
      activeRouteCheck = true;
    }

    return activeRouteCheck;
  };

  if (checkRoutePaths() && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return (
    <Link href={props.href} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  );
};

export const RouteLink = withRouter(ActiveLink);
