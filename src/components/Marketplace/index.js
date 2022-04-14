import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Drawer } from 'antd';
import { SvgIcon } from '../common';
import './index.scss';
import market from '../../services/marketplace';

const { Option } = Select; 

const InfoModal = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type='primary' className='btn-filled' onClick={showDrawer}><SvgIcon name='info' viewbox='0 0 18 36' /></Button>
      <Drawer className="marketplacedrawer" width={480} title="Asset Info" placement="right" onClose={onClose} visible={visible}>
        <div className='info-drawer-inner'>
          <div className='info-drawer-upper'>
            <div className='info-image'>
            </div>
            <div className='info-details'>
              <h2 className='mt-2 mb-0'>OmniBulls</h2>
              <h3 className='mb-0'>OmniBull #043</h3>
              <ul>
                <li>
                  <label>NFT ID</label>
                  <p>onfte1b.srmp</p>
                </li>
                <li>
                  <label>DENOM ID</label>
                  <p>Abc Title</p>
                </li>
                <li>
                  <label>IPFS Link</label>
                  <p>link here</p>
                </li>
                <li>
                  <label>Blockchain</label>
                  <p>CMDX</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='info-drawer-bottom'>
            <div>
              Current Price : <b>152 CMDX</b>
            </div>
            <Button type='primary' className='btn-filled float-btn'>Buy Now</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

const Marketplace = () => {
  const [marketdata,setMarketData]=useState({});
  const [loading,setLoading]=useState(true);
  useEffect( () => {
    const newmarketData = market().then(function(result){
      setMarketData(result);
    })
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    
  },[]);
  return (
    <div className='marketplace-wapper'>
      <div className='marketplace-head'>
        <div className='head-inner'>
          <div className='left'>
            <h3>Results: <span>11772</span></h3>
            <Input placeholder='Search' />
          </div>
          <div className='right'>
            <Select defaultValue="7d">
              <Option value="7d">7 Days</Option>
              <Option value="15d">15 Days</Option>
            </Select>
            <Button className='filter-icon'><SvgIcon name='filter' viewbox='0 0 33 30' /></Button>
          </div>
        </div>
      </div>
      <div className='marketplace-list'>
      {marketdata.length > 0 && marketdata.map((item,index )=>{
        return(
          <div className='marketplace-card' key={index}>
            <div className='marketplace-card-inner'>
              <div className='marketplace-card-head'>

              </div>
              <div className='info-drawer-toogle'><div className='infodrawertoogle-inner'><InfoModal /></div></div>
              <div className='marketplace-card-image' style={{ backgroundImage: `url(${item.uri})` }}></div>
              <div className='marketplace-card-bottom'>
                <label>Token id: {item.token_id}</label>
                <h2>{item.name}</h2>
                <ul className=''>
                  <li>
                    <label>Seller</label>
                    <h2>{item.seller}</h2>
                  </li>
                  <li>
                    <label>Price</label>
                    <h2>{item.list_price.amount} CMDX</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          )}
          )}
      </div>
    </div>
  );
}

export default Marketplace;