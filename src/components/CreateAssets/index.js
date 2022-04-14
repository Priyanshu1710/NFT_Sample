import React from 'react';
import { Button, Input, Select, message } from 'antd';
import { SvgIcon, Row, Col } from '../common';
import { Link } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';
import main from '../../services/mintedWrite'

import CardImage from '../../assets/images/card-img.jpg';

const { Option } = Select; 
const { TextArea } = Input;

const CreateAssets = () => {
  const [name, setName] = useState('');
  const [desc, setdesc] = useState('');
  localStorage.setItem('an',name);
  localStorage.setItem('de',desc);
  
  return (
    <div className='create-asset-warpper'>
      <div className='createassetwarpper-inner'>
        <div className='createassetwarpper-header'>
          <h2>Create Asset</h2>
          <Link to="/dashboard"><Button type='primary' className='btn-filled' size='large'>Save and Exit</Button></Link>
        </div>
        <div className='createassetwarpper-body'>
          <div className='createassetwarpper-left'>
            <div className='createform-content'>
              <Row className='form-row'>
                <Col md='6'>
                  <label>Asset Title *</label>
                  <p>Enter your asset title over here. If empty, filename or ID of the source will be taken as title</p>
                </Col>
                <Col md='6'>
                  <Input size='large' onChange={event => setName(event.target.value)} required/>
                </Col>
              </Row>
              {/* <Row className='form-row'>
                <Col sm='6'>
                  <label>Upload File*</label>
                  <p>Drag and Drop or Select file to upload</p>
                </Col>
                <Col sm='6'>
                  <Dragger {...props}>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <Divider className='upload-divider' />
                    <Button type='primary' className='btn-filled'>Click to Upload</Button>
                  </Dragger>
                </Col>
              </Row> */}
              <Row className='form-row'>
                <Col md='12'>
                  <label>Uploaded files</label>
                  <p>Start typing and hit enter to create a new category or choose a category from the list</p>
                </Col>
                <Col md='12'>
                  <div className='assets-img-uploaded'>
                    <div className='leftitle'><SvgIcon name='imagethumb' viewbox='0 0 30 30' /> imagefile.png</div>
                    <SvgIcon className='delete-icon' name='trash' viewbox='0 0 31.5 36' />
                  </div>
                </Col>
              </Row>
              <Row className='form-row'>
                <Col md='12'>
                  <label>Description</label>
                  <p>Write down description for your asset over here. Can contain a maximum of 256 characters.</p>
                </Col>
                <Col md='12'>
                  <TextArea rows={5} onChange={event => setdesc(event.target.value)}/>
                </Col>
              </Row>
              <Row>
                <Col className='text-right mt-2'>
                  <Button type="primary" size='large' className='btn-filled' onClick={main} disabled={!name ? true:false}>
                    Mint
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div className='createassetwarpper-right'>
            <div className='createassetwarpper-upper'>
              <div className='asstestype'>
                <div className='asstestype-inner'>
                  Asset Type <span>Image</span>
                </div>
              </div>
              <div className='info-image'>
                <img src={CardImage} />
              </div>
              <div className='info-details'>
                <ul>
                  <li>
                    <label>Asset Title</label>
                    <p>Abc Title</p>
                  </li>
                  <li>
                    <label>File URL</label>
                    <p>http://localhost:3001/create-assets</p>
                  </li>
                  <li>
                    <label>Category</label>
                    <p>Ctg name</p>
                  </li>
                  <li>
                    <label>Description</label>
                    <p>description text here..</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAssets;