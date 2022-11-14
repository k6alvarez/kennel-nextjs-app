import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { LeftNav } from "./Navigation/LogoLinks";
import { Drawer } from "antd";
import { LogoName } from "./Navigation/NavStyles";

export const StyledNav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space[3]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 5000;
  a {
    color: ${({ theme }) => theme.colors.textPrimary};

    &[data-active="true"] {
      text-decoration: underline;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .leftNav {
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    color: ${({ theme }) => theme.colors.textPrimary};

    .mobileNav {
      @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        display: none;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      width: auto;
    }
  }

  .rightNav {
    display: none;

    letter-spacing: 1px;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      display: flex;
    }
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  &:last-child {
    justify-content: flex-end;
  }

  a {
    text-decoration: none;
    margin: 0 ${({ theme }) => theme.space[3]};
  }

  a,
  button {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

const getMainLinks = (isActive) => (
  <>
    <Link href="/boarding">
      <a data-active={isActive("/boarding")}>Boarding</a>
    </Link>
    <Link href="/training">
      <a data-active={isActive("/training")}>Training</a>
    </Link>
    <Link href="/policies">
      <a data-active={isActive("/policies")}>Policies</a>
    </Link>
    <Link href="/rates">
      <a data-active={isActive("/rates")}>Rates</a>
    </Link>
    <Link href="/create-reservation">
      <a data-active={isActive("/create-reservation")}>Book Reservation</a>
    </Link>
  </>
);

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  let leftNav = <LeftNav toggleDrawer={toggleDrawer} />;

  let rightNav = null;

  if (status === "loading") {
    leftNav = (
      <div>
        <LeftNav toggleDrawer={toggleDrawer} />
      </div>
    );
    rightNav = (
      <div className="rightNav">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    rightNav = (
      <NavWrapper className="rightNav">
        {getMainLinks(isActive)}
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log In</a>
        </Link>
      </NavWrapper>
    );
  }

  if (session) {
    rightNav = (
      <NavWrapper className="rightNav">
        {getMainLinks(isActive)}
        <Link href="/profile">
          <a data-active={isActive("/profile")}>My Profile</a>
        </Link>
        <button
          onClick={() => {
            signOut({ redirect: false, callbackUrl: "/" }).then(({ url }) => {
              router.push(url);
            });
          }}
        >
          Log Out
        </button>
      </NavWrapper>
    );
  }

  return (
    <StyledNav>
      {leftNav}
      {rightNav}
      <Drawer
        title={<LogoName>Gillette Kennels</LogoName>}
        placement="left"
        onClose={onClose}
        open={open}
      >
        {rightNav}
      </Drawer>
    </StyledNav>
  );
};

export default Header;
