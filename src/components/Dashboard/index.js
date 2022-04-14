import React, { useEffect, useState } from 'react';
import { Button, Tabs, Modal } from 'antd';
import { message } from 'antd';
import { SvgIcon } from '../common';
import { Link } from 'react-router-dom';
import './index.scss';
import InfoModal from './Infomodal';
import ListNftModal from './Listnftmodal';
import Burnftmodal from './Burnftmodal';

import main from '../../services/contract';
import listMinted from '../../services/minted';
import listed from '../../services/listed';
import ownedToken from '../../services/ownedToken';
import { initializeChain } from '../../services/keplr';

const { TabPane } = Tabs;

const ViewModal = ({ img }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type='primary' className='btn-filled' onClick={showModal}><SvgIcon name='eye' viewbox='0 0 40.5 27' /></Button>
      <Modal width={700} className='thumbpreview-modal' title="" visible={isModalVisible} footer={false} onCancel={handleCancel}>
        <div className='image-priview'>
          <img src={img} alt="" />
        </div>
        {/* <div className='action-bar'>
          <Button type='primary' className='btn-filled'><SvgIcon name='pencil' viewbox='0 0 35.998 35.999' /></Button>
          <Button type='primary' className='btn-filled'><SvgIcon name='trash' viewbox='0 0 31.5 36' /></Button>
        </div> */}
      </Modal>
    </>
  );
}


const Dashboard = () => {
  const [nonMinted, setnonMinted] = useState({});
  const [Minted, setMinted] = useState({});
  const [nftListed, setNftListed] = useState({});
  const [ownedNFTData, setOwnedNFTData] = useState({});
  const [loading, setLoading] = useState(true);

  const truncateString = (string, front, back) =>
    `${string.substr(0, front)}......${string.substr(
      string.length - back,
      string.length
    )}`;

  useEffect(() => {
    const ownedData = ownedToken().then(function (result) {
      console.log(result);
      setOwnedNFTData(result);
      setLoading(false)
    })
  }, []);
  if (loading) {
    return (
      <div className="loading_animation">
        <h1>Loading...</h1>
      </div>
    )
  }
  else {


    return (
      <div className='dashboard-warpper'>
        <div className='dashboard-content'>
          <Tabs defaultActiveKey="1">
            <TabPane tab="My NFTs" key="2">
              <div className='dashboard-list-wapper'>
                <div className='dashboardcards-list'>
                  {ownedNFTData.length > 0 && ownedNFTData.map((item, index) => {
                    return (
                      <div className='dashboard-card' key={index}>
                        <div className='dashboard-card-inner'>
                          <div className='dashboard-card-upper'>
                            <img src={item[1].image} alt="error" />
                            <div className='card-overlay'>
                              <div className='card-overlay-inner'>
                                <ViewModal img={item[1].image} />
                                <InfoModal img={item[1].image} item={item[1]} />
                              </div>
                            </div>
                          </div>
                          <div className='dashboard-card-bottom'>
                            <h3>TokenId: {item[1].tokenid}</h3>
                            {/* <h3>Owner: {item[1].owner}</h3> */}
                            <h4>Owner: {truncateString(item[1].owner, 9, 7)}</h4>
                            <Burnftmodal tokenId={item[1].tokenid} />
                            <ListNftModal tokenId={item[1].tokenid} />
                          </div>
                        </div>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            </TabPane>




          </Tabs>
        </div>
      </div>
    );
  }
}

export default Dashboard;