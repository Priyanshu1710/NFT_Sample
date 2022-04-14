import React from "react";
import { SvgIcon } from "../../common";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.scss";
import { Button, Dropdown, Menu } from "antd";
import CreateModal from '../../Createmodal';

const createMenu = (
  <Menu className="create-menu-icon">
    <Menu.Item>
      <CreateModal />
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  const accnt = localStorage.getItem("ac");
  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="logo">
        </div>
        <div className="header-right">
          <div className="nav">
          </div>
          <Dropdown overlay={createMenu} overlayClassName="dropdown-create">
            <Button className="create-btn">Create</Button>
          </Dropdown>
          <div className="wattet-connect">
            <Button type="primary" className="connect-btn btn-filled">{accnt}</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
