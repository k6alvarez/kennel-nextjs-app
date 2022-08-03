import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { ShieldLogo } from "./Navigation/LogoLinks";

const StyledNav = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space[2]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  a {
    color: ${({ theme }) => theme.colors.textPrimary};

    &[data-active="true"] {
      text-decoration: underline;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.nav};
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
const NavWrapper = styled.div`
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
    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }
`;

export const isActive: (pathname: string, routerPathname: string) => boolean = (
  pathname,
  routerPathname
) => routerPathname === pathname;

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  let leftNav = <ShieldLogo />;

  let rightNav = null;

  if (status === "loading") {
    leftNav = (
      <div>
        <Link href="/boarding">
          <a data-active={isActive("/boarding", router.pathname)}>Boarding</a>
        </Link>
        {/* <Link href="/">
        <a data-active={isActive("/")}>Feed</a>
      </Link> */}
        <Link href="/training">
          <a data-active={isActive("/training", router.pathname)}>Training</a>
        </Link>
        <ShieldLogo />
      </div>
    );
    rightNav = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    rightNav = (
      <NavWrapper>
        <Link href="/boarding">
          <a data-active={isActive("/boarding")}>Boarding</a>
        </Link>
        {/* <Link href="/">
        <a data-active={isActive("/")}>Feed</a>
      </Link> */}
        <Link href="/training">
          <a data-active={isActive("/training")}>Training</a>
        </Link>
        <Link href="/create-reservation">
          <a data-active={isActive("/create-reservation")}>Book Reservation</a>
        </Link>
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log In</a>
        </Link>
      </NavWrapper>
    );
  }

  if (session) {
    rightNav = (
      <NavWrapper>
        <Link href="/boarding">
          <a data-active={isActive("/boarding")}>Boarding</a>
        </Link>
        {/* <Link href="/">
        <a data-active={isActive("/")}>Feed</a>
      </Link> */}
        <Link href="/training">
          <a data-active={isActive("/training")}>Training</a>
        </Link>
        <Link href="/create-reservation">
          <a data-active={isActive("/create-reservation")}>Book Reservation</a>
        </Link>
        <Link href="/profile">
          <a data-active={isActive("/profile")}>My Profile</a>
        </Link>
        {/* <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link> */}
        <button onClick={() => signOut()}>Log Out</button>
      </NavWrapper>
    );
  }

  return (
    <StyledNav>
      {leftNav}
      {rightNav}
    </StyledNav>
  );
};

export default Header;
