import React, { useEffect, useState } from 'react';
import { Button, Modal, Upload, message, Divider } from 'antd';
import { Row, Col } from '../common';

import { SvgIcon } from '../common';
import './index.scss';
import { FileUpload } from '../../services/Ipfs'
import main from '../../services/contractWrite'
import { Form, Input, Checkbox } from 'antd';
import mintTransaction from '../../services/contractWrite';
import ownedToken from '../../services/ownedToken';


const CreateModal = () => {
  const [assetName, setAssetName] = useState("Gggg");
  const [assetDesc, setAssetDesc] = useState();
  const [creatorAdd, setCreatorAdd] = useState();
  const [transferAdd, setTransferAdd] = useState('');

  useEffect(() => {
    let add = localStorage.getItem("ac");
    setCreatorAdd(add);
  }, [])



  const onFinish = (assetName, assetDesc) => {
    console.log('Success:', assetName, assetDesc);
    // mintTransaction(assetName, assetDesc)
    if (assetName && assetDesc) {
      mintTransaction(assetName, assetDesc, (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
        setIsModalVisible(false)
        handleTokenOk()
        // setIsTokenModalVisible(true)
        console.log(result);
      })
    }
    console.log("Thisbcdsc  ", assetName, assetDesc);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTiokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [nftId, setNftId] = useState();
  const [fileUrl, setFileUrl] = useState('');
  localStorage.setItem('fl', fileUrl);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onAssethandleChange = (e) => {
    setAssetName(e.target.value)
  }
  const onDescHandleChange = (e) => {
    setAssetDesc(e.target.value);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleTokenOk = () => {
    setIsTokenModalVisible(true)
    setLoading(true)
    const ownedData = ownedToken().then(function (result) {
      console.log(result);
      let length = result.length;
      console.log(result[length - 1][1].tokenid);
      setNftId(result[length - 1][1].tokenid)
      setLoading(false)
      // setOwnedNFTData(result);
    })
    // setIsTokenModalVisible(false);
  };
  const handleTokenCancel = () => {
    setIsTokenModalVisible(false);
  };

  return (
    <>
      <div className="menu-inner" onClick={showModal}>
        <div className="left-icon">
          <SvgIcon name="upload-icon" viewbox="0 0 45 31.5" />
        </div>
        <div>
          <h4>Asset via File Upload</h4>
          <p>create audio, video, document NFTs by uploading file</p>
        </div>
      </div>
      <Modal width={600} className='creatasset-modal' title="Create Assets by Uploading Files" visible={isModalVisible} footer={false} onCancel={handleCancel}>
        <div>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>

          <div className="input_container">

            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* <Form.Item key="1" label="Token ID" style={{ color: "white" }} name="assetName" rules={[
                {
                  required: true,
                  message: 'Please input Token ID!',
                },
              ]}
              >
                <Input onChange={(e) => onAssethandleChange(e)} />
              </Form.Item> */}
              <Form.Item key="1" label="Assset Name" style={{ color: "white" }} name="assetName" rules={[
                {
                  required: true,
                  message: 'Please input asset name!',
                },
              ]}
              >
                <Input onChange={(e) => onAssethandleChange(e)} />
              </Form.Item>

              <Form.Item key="2" label="Asset Description" name="assetDescription" rules={[
                {
                  required: true,
                  message: 'Please input asset description!',
                },
              ]}
              >
                <Input onChange={(e) => onDescHandleChange(e)} />
              </Form.Item>
              <Form.Item key="3" label="Creator" name="assetCreator" initialValue={creatorAdd} rules={[
                {
                  required: true,
                  message: 'Please input creator address!',
                },
              ]}
              >
                <Input />
              </Form.Item>


              <Form.Item
                key="4"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                {/* <Button type="primary" htmlType="submit">
                  Submit
                </Button> */}
                <Divider className='upload-divider' />
                <FileUpload setUrl={setFileUrl} />
                <h3>{fileUrl}</h3>
                <div className='pt-4 text-center'>
                  <Button type='primary' className='btn-filled' htmlType="submit" onClick={() => onFinish(assetName, assetDesc)} >Mint Nft</Button>
                </div>
              </Form.Item>
            </Form>
          </div>

        </div>
      </Modal>


      {/* New  Modal  */}
      <Modal width={500} className='creatasset-modal' title="Transfer NFT" visible={isTiokenModalVisible} footer={false} onCancel={handleTokenCancel}>
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
              {/* <label> Your NFT ID*</label> */}
              {/* <p>If listed, you should see this asset listed on the Marketplace</p> */}
            </Col>
            {/* <Col sm='12'>
              <Input size='large' onChange={event => setTransferAdd(event.target.value)} pattern="[0-9]*" required />
            </Col> */}
            {loading && (
              <h3 style={{ textAlign: "center", width: "100%", fontSize: "2rem" }}>Loading...</h3>
            )}
            {!loading && <h3 style={{ textAlign: "center", width: "100%" }}> Minted NFT ID is : {nftId}</h3>}
          </Row>
          <Button type='primary' block size='large' className='btn-filled mt-3' onClick={() => handleTokenCancel()} >Close</Button>
        </div>
      </Modal>
    </>
  );
}

export default CreateModal;