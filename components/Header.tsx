import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { LeftNav } from "./Navigation/LogoLinks";
import { Drawer } from "antd";
import { LogoName } from "./Navigation/NavStyles";
import { ThemePreferenceContext } from "../pages/_app";
import { User } from "@prisma/client";
import { getUser } from "./Pets/services";

const SignedInAs = styled.span`
  font-size: calc(${({ theme }) => theme.fontSizes[0]} / 1.2);
  padding: ${({ theme }) => theme.space[1]};
  display: block;
  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

const Flex = styled.div`
  display: flex;
  width: 96%;
  margin: ${({ theme }) => theme.space[3]} auto;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: max-content;
    margin: 0;
  }

  button {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-size: calc(${({ theme }) => theme.fontSizes[0]} / 1.2);
  }
`;
export const StyledNav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space[3]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 5000;

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  a {
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;

    &[data-active="true"],
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    font-size: ${({ theme }) => theme.fontSizes[0]};
    white-space: nowrap;
  }

  .leftNav {
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    margin-right: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.textPrimary};

    .mobileNav {
      @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
        display: none;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      width: auto;
    }
  }

  .rightNav {
    display: none;

    letter-spacing: 1px;

    @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      display: flex;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

export const NavWrapper = styled.div`
  display: none;
  flex-direction: column-reverse !important;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    flex-direction: row !important;
    display: flex;
  }

  &:last-child {
    justify-content: flex-end;

    a:first-child {
      border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};

      @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
        border-bottom: none;
      }
    }
  }

  a {
    text-decoration: none;
    margin: 0 ${({ theme }) => theme.space[3]};
  }

  a,
  button {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }

  button:last-child {
    margin-left: ${({ theme }) => theme.space[3]};
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
    <Link href="/contact">
      <a data-active={isActive("/contact")}>Contact</a>
    </Link>
    <Link href="/create-reservation">
      <a data-active={isActive("/create-reservation")}>Book Reservation</a>
    </Link>
  </>
);

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>(undefined);
  const { currentTheme, editMode, setEditMode } = useContext(
    ThemePreferenceContext
  );
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

  useEffect(() => {
    if (session) {
      getUser().then((user) => {
        setLoggedInUser(user as User);
      });
    }
  }, [session]);

  let leftNav = <LeftNav toggleDrawer={toggleDrawer} />;

  let rightNav = null;

  let centerNav = null;

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

    centerNav = (
      <div className="centerNav">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    rightNav = (
      <NavWrapper className="rightNav">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log In</a>
        </Link>
      </NavWrapper>
    );

    centerNav = (
      <NavWrapper className="centerNav">{getMainLinks(isActive)}</NavWrapper>
    );
  }

  if (session) {
    rightNav = (
      <NavWrapper className="rightNav">
        <Link href="/profile">
          <a data-active={isActive("/profile")}>My Profile</a>
        </Link>
        <Flex>
          <SignedInAs>Signed in as {loggedInUser?.email}</SignedInAs>
          <button
            onClick={() => {
              signOut({ redirect: false, callbackUrl: "/" }).then(({ url }) => {
                router.push(url);
              });
            }}
          >
            Log Out
          </button>
        </Flex>
        {loggedInUser?.permissions.includes("ADMIN") && (
          <Flex>
            <button
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Admin Mode {editMode ? "On" : "Off"}
            </button>
          </Flex>
        )}
      </NavWrapper>
    );

    centerNav = (
      <NavWrapper className="centerNav">{getMainLinks(isActive)}</NavWrapper>
    );
  }

  return (
    <StyledNav currentTheme={currentTheme}>
      {leftNav}
      {centerNav}
      {rightNav}
      <Drawer
        title={
          <LogoName>
            <Link href="/">
              <a>Gillette Kennels</a>
            </Link>
          </LogoName>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        {rightNav}
        <NavWrapper className="rightNav">{getMainLinks(isActive)}</NavWrapper>
      </Drawer>
    </StyledNav>
  );
};

export default Header;
