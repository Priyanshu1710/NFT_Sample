import React, { Component } from 'react';
import { Button, message } from 'antd';
import { SvgIcon } from '../common';
import { Link } from 'react-router-dom';
import './index.scss';

import HomeBg from '../../assets/images/homr-bg.png';
import KeplerLogo from '../../assets/images/keplr-logo.svg';
import { initializeChain } from '../../services/keplr';

window.addEventListener("keplr_keystorechange", () => {
  handleConnectToKeplr();
});
const handleConnectToKeplr = () => {
  initializeChain((error, account) => {
    if (error) {
      message.error(error);
      return;
    }
    localStorage.setItem("ac", account.address);
  });
};

const HomePage = () => {
  return (
    <div className='home-screen'>
      <div className='left'>
        <img src={HomeBg} alt='Banner' />
      </div>
      <div className='right'>
        <div className='logo'>
        </div>
        <h1>Create, Manage, Distribute {"&"} Monetize Media Assets</h1>
        <p>Create tokenized assets {"&"} communities. Mint, manage, monitor both NFTs and tokens powering your community. </p>
        <Link to='/request-approve'><Button type='primary' size='large' onClick={handleConnectToKeplr}><img src={KeplerLogo} /> Connect with Kepler</Button></Link>
      </div>
    </div>
  );
}

export default HomePage;
