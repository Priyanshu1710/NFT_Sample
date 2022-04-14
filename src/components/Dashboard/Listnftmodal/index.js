import React, { useState } from 'react';
import { Button, Modal, Upload, Input, Select } from 'antd';
import { SvgIcon, Row, Col } from '../../common';
import './index.scss';
import main from '../../../services/listedWrite'
import { transferTransaction } from '../../../services/contractWrite';

const { Option } = Select;

const ListNftModal = ({ tokenId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferAdd, setTransferAdd] = useState('');
  localStorage.setItem('pr', transferAdd);

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
      <Button type='primary' size='small' className='btn-filled mint-nft-btn' onClick={showModal}>Transfer </Button>
      <Modal width={500} className='creatasset-modal' title="Transfer NFT" visible={isModalVisible} footer={false} onCancel={handleCancel}>
        <div className='listnft-wrapper createform-content'>
          {/* <Row className='form-row'>
            <Col sm='12'>
              <label>Listing Type*</label>
              <p>Helping Text</p>
            </Col>
            <Col sm='12'>
              <Select defaultValue="lp1" className='w-100 ant-select-lg' disabled>
                <Option value="lp1">Fixed</Option>
              </Select>
            </Col>
          </Row> */}
          <Row className='form-row'>
            <Col sm='12'>
              <label>Recipient Address*</label>
              {/* <p>If listed, you should see this asset listed on the Marketplace</p> */}
            </Col>
            <Col sm='12'>
              <Input size='large' onChange={event => setTransferAdd(event.target.value)} pattern="[0-9]*" required />
            </Col>
          </Row>
          <Button type='primary' block size='large' className='btn-filled mt-3' onClick={() => transferTransaction(transferAdd, tokenId)} disabled={!transferAdd ? true : false}>Transfer NFT</Button>
        </div>
      </Modal>
    </>
  );
}

export default ListNftModal;