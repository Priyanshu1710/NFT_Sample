import React, { useState } from 'react';
import { Button, Modal, Upload, Input, Select } from 'antd';
import { SvgIcon, Row, Col } from '../../common';
import './index.scss';
import { burnTransaction } from '../../../services/contractWrite';

const { Option } = Select;

const Burnftmodal = ({ tokenId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);

  };

  const handleOk = () => {
    setIsModalVisible(false);
    burnTransaction(tokenId)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type='primary' size='small' className='mint-nft-btn ml-2' onClick={showModal}>Burn</Button>
      <Modal width={500} className='creatasset-modal' title="Burn NFT" visible={isModalVisible} footer={false} onCancel={handleCancel}>
        <div className='listnft-wrapper createform-content'>
          <Row className='form-row'>
            <Col sm='12' className='text-center'>
              <p>You are about to burn "NFT name", Click to "Confirm" button to proceed </p>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <Button type='primary' className='btn-filled mt-3' onClick={handleOk}>Burn Nft</Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default Burnftmodal;