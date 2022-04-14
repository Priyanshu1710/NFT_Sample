import React from "react";
import PropTypes from "prop-types";

import { Navbar, LeftMenu } from "../components/layout";

const DefaultLayout = ({ children, navbar, leftMenu }) => (
  <React.Fragment>
    {!navbar && <Navbar />}
    <main>
      <div className="main-section">
        <div className="main-section-inner">
          {!leftMenu && <LeftMenu />}
          {children} 
        </div>
      </div>
    </main>
  </React.Fragment>
);

DefaultLayout.propTypes = {
  navbar: PropTypes.bool,
  footer: PropTypes.bool
};

DefaultLayout.defaultProps = {
  navbar: false,
  footer: false
};

export default DefaultLayout;