import React,{useState} from 'react';
import { Handle } from 'react-flow-renderer';
import {Button, Popover}from 'antd'
import {
  CheckOutlined
}from '@ant-design/icons'
import { useStore } from '../store';
import { observer } from 'mobx-react-lite';
import './main.css'
function SkillCard(props) {
  const [isSelected, setIsSelected] = useState(false);
  const {SkillStore} = useStore()
  
  const handleMouseEnter = () => {
    setIsSelected(true);
    
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };
  const spanClassName = `${'default-font'} ${isSelected ? 'selected-span' : ''}`;
  
  function HandleClickSkill(x) {
    SkillStore.learnSkill(x)
    setTimeout(() => {
      SkillStore.updateLearnedSkills()
    }, 200);
    
  }
  let content = <div>okok</div>
  if(SkillStore.skill_list.length >= props.id){
    content = <div >
      <Popover  content={
        
        <div >
          <p className='default-h-font'>描述</p>
          <div className='mini-font'>{SkillStore.skill_list[props.id-1].effect_describe} </div>
          <p className='default-h-font'>背景</p>
          
          <div className='mini-font'>{SkillStore.skill_list[props.id-1].background_describe} </div>
        </div>
    } >
    <p className='default-font'>{SkillStore.skill_list[props.id-1].name}</p> 
     </Popover>
     {!(SkillStore.learned_skills.includes(props.id ))&&<div>
     {('mana_cost' in SkillStore.skill_list[props.id-1])&&<p>消耗法力:{SkillStore.skill_list[props.id-1].mana_cost}</p>}
     {('coin_cost' in SkillStore.skill_list[props.id-1])&&<p>消耗金币:{SkillStore.skill_list[props.id-1].coin_cost}</p>}
     {('mineral_cost' in SkillStore.skill_list[props.id-1])&&<p>消耗矿物:{SkillStore.skill_list[props.id-1].mineral_cost}</p>}
     {('dwarf_limit' in SkillStore.skill_list[props.id-1])&&<p>需要矮人数:{SkillStore.skill_list[props.id-1].dwarf_limit}</p>}
     </div>}
     {(SkillStore.learned_skills.includes(props.id ))?
     <CheckOutlined />:
      <div className='my-button2'>
        <span className={spanClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} 
          onClick={() => HandleClickSkill(props.id)}
          >
            学习
          </span>
        </div>
      }
    </div>
    
    
  }
  return <div>{content}</div>
}

export default observer(SkillCard);