import React from "react";
import * as UI from "./style";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Navbar as ReactNavbar,
  Nav as ReactNav,
  Dropdown,
} from "react-bootstrap";
import { useActiveUser, UserCurrentStatus } from "../UserProvider";

/**
 * Nav component
 */
export const Navbar: React.FC = () => {
  const { user, status } = useActiveUser();

  const navbarUserDropdown = (
    <Dropdown>
      <UI.NavbarDropdownToggle id="navbar-account-dropdown">
        <UI.NavbarUserIcon icon={faUserCircle} />
      </UI.NavbarDropdownToggle>
      <Dropdown.Menu className="dropdown-menu-right">
        <Dropdown.Header>{user?.email}</Dropdown.Header>
        <Dropdown.Item href="/auth/logout?r=/events">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <UI.Navbar expand="sm">
      <UI.NavbarSpan>
        <ReactNavbar.Toggle aria-controls="navbar-responsive-dropdown" />
        <UI.NavbarLogo
          src="events/img/logos/main.png"
          className="d-none d-sm-block" // Hide icon below sm screens.
        ></UI.NavbarLogo>
      </UI.NavbarSpan>
      <ReactNavbar.Collapse
        id="navbar-responsive-dropdown"
        className="justify-content-center"
      >
        <ReactNav>
          <UI.NavLink href="/#home">Home</UI.NavLink>
          <UI.NavLink href="/events">Events</UI.NavLink>
          <UI.NavLink href="/apply">Apply</UI.NavLink>
        </ReactNav>
        <span
          className="d-sm-none" // Hide above sm screens.
        >
          <UI.NavUserInfoDivider />
          {status === UserCurrentStatus.LoggedIn ? (
            <>
              <UI.NavUserInfo className="text-muted">
                {user?.email}
              </UI.NavUserInfo>
              <UI.NavLink href="/auth/logout?r=/events">Logout</UI.NavLink>
            </>
          ) : (
            <UI.NavLink href="/auth/logout?r=/events">
              Login / Signup
            </UI.NavLink>
          )}
        </span>
      </ReactNavbar.Collapse>
      <UI.NavbarSpan
        className="d-none d-sm-block text-right" // Hide icon below sm screens.
      >
        {status === UserCurrentStatus.LoggedIn ? (
          navbarUserDropdown
        ) : (
          <UI.NavbarLoginLink href="/auth/login?r=/events">
            Login / Signup
          </UI.NavbarLoginLink>
        )}
      </UI.NavbarSpan>
    </UI.Navbar>
  );
};
