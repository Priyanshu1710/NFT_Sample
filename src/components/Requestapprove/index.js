import React, { Component } from 'react';
import { Button } from 'antd';
import { SvgIcon } from '../common';
import { Link } from 'react-router-dom';
import './index.scss';

import KeplerLogo from '../../assets/images/keplr-logo.svg';

const Requestapprove = () => {
  return (
    <div className='request-screen'>
        <div className='request-card'>
          <Link to='/dashboard'>
            <img src={KeplerLogo} alt='kepler' />
            <h2>Approve connection request on the Keplr window...</h2>
          </Link>
        </div>
    </div>
  );
}

export default Requestapprove;
