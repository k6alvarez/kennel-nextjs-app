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
  }
`;
const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    text-decoration: none;
    margin: 0 ${({ theme }) => theme.space[3]};
  }
`;

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let leftNav = (
    <NavWrapper>
      <Link href="/">
        <a data-active={isActive("/")}>Boarding</a>
      </Link>
      {/* <Link href="/">
        <a data-active={isActive("/")}>Feed</a>
      </Link> */}
      <Link href="/">
        <a data-active={isActive("/")}>Training</a>
      </Link>
    </NavWrapper>
  );

  let rightNav = null;

  if (status === "loading") {
    leftNav = (
      <div>
        <Link href="/">
          <a data-active={isActive("/")}>Feed</a>
        </Link>
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
        <Link href="/">
          <a data-active={isActive("/signup")}>Reservations</a>
        </Link>
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </NavWrapper>
    );
  }

  if (session) {
    leftNav = (
      <NavWrapper>
        <Link href="/">
          <a data-active={isActive("/")}>Feed</a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </NavWrapper>
    );
    rightNav = (
      <NavWrapper>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </NavWrapper>
    );
  }

  return (
    <StyledNav>
      {/* {leftNav} */}
      <ShieldLogo setMobileMenuOpen={undefined} />
      {/* {rightNav} */}
    </StyledNav>
  );
};

export default Header;
