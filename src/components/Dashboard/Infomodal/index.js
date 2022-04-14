import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { SvgIcon } from '../../common';
import './index.scss';

import CardImage from '../../../assets/images/card-img.jpg';

const InfoModal = ({ img, item }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
    console.log(item);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type='primary' className='btn-filled' onClick={showDrawer}><SvgIcon name='info' viewbox='0 0 18 36' /></Button>
      <Drawer className="info-drawer" width={480} title="NFT Info" placement="right" onClose={onClose} visible={visible}>
        <div className='info-drawer-inner'>
          <div className='info-drawer-upper'>
            <div className='info-image'>
              <img src={img} />
            </div>
            <div className='info-details'>
              <ul>
                <li>
                  <label style={{ fontWeight: "800" }}>Token ID </label>
                  <p style={{ fontWeight: "800" }}>{item.tokenid}</p>
                </li>
                <li>
                  <label>Asset Name</label>
                  <p>{item.name}</p>
                </li>
                <li>
                  <label>Creator</label>
                  <p>{item.creator}</p>
                </li>
                <li>
                  <label>Owner</label>
                  <p>{item.owner}</p>
                </li>
                <li>
                  <label>Image URI</label>
                  <p style={{ width: "320px" }}> {item.image}</p>
                </li>
                <li>
                  <label>Description</label>
                  <p  >{item.description}</p>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className='info-drawer-bottom'>
            <Button type='primary' className='btn-filled float-btn'>Mint NFT</Button>
            <Button type='primary' className='action-btn'><SvgIcon name='pencil' viewbox='0 0 35.998 35.999' /></Button>
            <Button type='primary' className='action-btn'><SvgIcon name='trash' viewbox='0 0 31.5 36' /></Button>
          </div> */}
        </div>
      </Drawer>
    </>
  );
}

export default InfoModal;