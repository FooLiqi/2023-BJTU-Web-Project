import { Row,  Space,  Tooltip, Button ,Input, Tag , message} from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'
import { useStore } from '../store';
import { http } from '../utils';
import './main.css'
import RankModal from '../rank/rank.modal';

const OperationComponent = () => {
  const {ResourceStore, MessageStore} = useStore();
  const [rankVisible, setRankVisible] = useState(false);
  const inputWidth1 = {    
    width: `${ (''+ResourceStore.miner).length * 8 + 60}px`, // 根据文本长度计算宽度，每个字符占用 8px 的宽度
  };
  const inputWidth2 = {
    
    width: `${(''+ResourceStore.merchant).length * 8 + 60}px`, // 根据文本长度计算宽度，每个字符占用 8px 的宽度
  };
  const inputWidth3 = {
    
    width: `${(''+ResourceStore.soldier).length * 8 + 60}px`, // 根据文本长度计算宽度，每个字符占用 8px 的宽度
  };
  
  const handleHireClick = async () => {
    try {
        const ret = await http.post('/api/employ', {
          
        })
        console.log(ret)
        if(ret.data.state === 'success') {
          MessageStore.addMessage(ret.data.message)

        }
        else {
          message.error(ret.data.error_message);
        }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleRankClicked = () => {
    setRankVisible(true)
  }

  const handleAddMiner = async ()=> {
    try {
      const ret = await http.post('api/dwarf/addMiner', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleDecMiner = async ()=> {
    try {
      const ret = await http.post('api/dwarf/subtractMiner', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleAddMerchant = async ()=> {
    try {
      const ret = await http.post('api/dwarf/addMerchant', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleDecMerchant = async ()=> {
    try {
      const ret = await http.post('api/dwarf/subtractMerchant', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleAddSoldier = async ()=> {
    try {
      const ret = await http.post('api/dwarf/addSoldier', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }
  const handleDecSoldier = async ()=> {
    try {
      const ret = await http.post('api/dwarf/subtractSoldier', {})
      console.log(ret)
      if(ret.data.state === 'success') {
        MessageStore.addMessage(ret.data.message)
      }
      else {
        message.error(ret.data.error_message);
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  var ok = 1
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => {
    setIsSelected(true);
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };
  const spanClassName = `${'default-font'} ${isSelected ? 'selected-span' : ''}`;

  return (
    <div>
      <RankModal visible = {rankVisible} setVisible={setRankVisible}></RankModal>
      <div className = 'operation'>
            <div className='my-button'>
              <span  className={spanClassName}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleHireClick}>
                      雇&nbsp;佣
              </span>
            </div>
            <div className='my-button'>
              <span  className={spanClassName}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                      出&nbsp;征
              </span>
            </div>
            <div className='my-button'>
              <span  className={spanClassName}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleRankClicked}
                  >
                      排&nbsp;行&nbsp;榜
              </span>
            </div>
          
          <div className='button-opration'>
            <div style = {{padding:'10px'}} >
            <div className='my-button multiline-text' >
                
                <span  className={spanClassName}>
                       &nbsp;&nbsp;矿&nbsp;工&nbsp;&nbsp;<br></br>
                </span>
                <div>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleDecMiner}>
                          &nbsp;&nbsp;-&nbsp;&nbsp;
                  </span>
                  <span  className={spanClassName}>
                          &nbsp;{ResourceStore.miner}&nbsp;
                  </span>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAddMiner}>
                          &nbsp;&nbsp;+&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            
              {/* <Button className='default-font' onClick={handleDecMiner}>-</Button>
              <Input value={'矿工：' + ResourceStore.miner}  style={inputWidth1} className='default-font' />
              <Button className='default-font' onClick={handleAddMiner}>+</Button> */}
            </div>
            <div style = {{padding:'10px'}} >
              <div className='my-button multiline-text' >
                
                <span  className={spanClassName}>
                       &nbsp;&nbsp;商&nbsp;人&nbsp;&nbsp;<br></br>
                </span>
                <div>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleDecMerchant}>
                          &nbsp;&nbsp;-&nbsp;&nbsp;
                  </span>
                  <span  className={spanClassName}>
                          &nbsp;{ResourceStore.merchant}&nbsp;
                  </span>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAddMerchant}>
                          &nbsp;&nbsp;+&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            
              {/* <Button className='default-font' onClick={handleDecMiner}>-</Button>
              <Input value={'矿工：' + ResourceStore.miner}  style={inputWidth1} className='default-font' />
              <Button className='default-font' onClick={handleAddMiner}>+</Button> */}
            </div>
            <div style = {{padding:'10px'}} >
              <div className='my-button multiline-text' >
                
                <span  className={spanClassName}>
                       &nbsp;&nbsp;战&nbsp;士&nbsp;&nbsp;<br></br>
                </span>
                <div>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleDecSoldier}>
                          &nbsp;&nbsp;-&nbsp;&nbsp;
                  </span>
                  <span  className={spanClassName}>
                          &nbsp;{ResourceStore.soldier}&nbsp;
                  </span>
                  <span  className={spanClassName}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAddSoldier}>
                          &nbsp;&nbsp;+&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            
              {/* <Button className='default-font' onClick={handleDecMiner}>-</Button>
              <Input value={'矿工：' + ResourceStore.miner}  style={inputWidth1} className='default-font' />
              <Button className='default-font' onClick={handleAddMiner}>+</Button> */}
            </div>
            {/* <div style = {{padding:'10px'}}>
              <Button className='default-font' onClick={handleDecMerchant}>-</Button>
              <Input value={'商人：'+ResourceStore.merchant}  style={inputWidth2} className='default-font' />
              <Button className='default-font' onClick={handleAddMerchant}>+</Button>
            </div> */}
            {/* <div style = {{padding:'10px'}}>
              <Button className='default-font' onClick={handleDecSoldier}>-</Button>
              <Input value={'战士：'+ResourceStore.soldier}  style={inputWidth3}  className='default-font' />
              <Button className='default-font' onClick={handleAddSoldier}>+</Button>
            </div> */}
          </div>
      </div>
    </div>
  );
};

export default observer(OperationComponent);