import { Row,  Space,  Tooltip, Button  } from 'antd';
import { useStore } from '../store';
import React,{useState} from 'react'
import './main.css'
import { observer } from 'mobx-react-lite'

import RankModal from '../rank/rank.modal';

function check() {
  console.log('checked ok')
}

const ResourceComponent = () => {
  const {ResourceStore} = useStore()
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
    
      <div className='vertical-container'>
        {ResourceStore.mineral >= 0 ?
            <span className={spanClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
              法力：{ResourceStore.mana}
            </span>
         : null}
          <div className='default-font'>
            金币：{ResourceStore.coin}
          </div>
        {(ResourceStore.dwarf >= 1) ?
            <div className='default-font'>
            <span onClick={() => check()}>矿物：{ResourceStore.mineral}</span>
            </div>
        : null }

          <span className='default-font'>
            矮人：{ResourceStore.dwarf}
          </span>
      </div>
  );
};

export default observer(ResourceComponent);