import React,{ useCallback,useState,useEffect ,useRef} from 'react';
import { skillNodes1 , skillEdges1, skillNodes2,skillEdges2 } from './skillElement.js';
import { Carousel, Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import  { FitViewParams } from 'react-flow-renderer';
import { useStore } from '../store';
import './main.css'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider, useReactFlow
} from 'reactflow';


const SwitchFlow = observer (() =>{


  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(skillNodes1);
  const [edges, setEdges, onEdgesChange] = useEdgesState(skillEdges1);
  const [fit,setFit] = useState(true)
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const {SkillStore} = useStore()
  const intervalRef = useRef(null);
  useEffect(() => {
    const shuf = () => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView();
      }
    };

    intervalRef.current = setInterval(shuf, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [reactFlowInstance]);
  
  const handleOnClick = () => {
    reactFlowInstance.fitView();
  }

  let content = null
  var skillNodes = skillNodes1
  var skillEdges = skillEdges1
  if(SkillStore.now_page === 1) {
    skillNodes = skillNodes1
    skillEdges = skillEdges1
  }
  if(SkillStore.now_page === 2) {
    skillNodes = skillNodes2
    skillEdges = skillEdges2
  }
  content = 
      <ReactFlow 
        nodes={skillNodes} 
        edges={skillEdges}
        onConnect={onConnect}
        nodesDraggable = {false}
        nodesFocusable = {false}
        zoomOnScroll = {false}
        zoomOnPinch = {false}
        zoomOnDoubleClick = {false}
        panOnDrag = {false}
        haha = {reactFlowInstance}
        fitView
      >
      </ReactFlow>
      
  return <><div style = {{width:'50vw',height:'70vh'}}>{content} </div></>
})

function SkillTree () {
  const [nodes, setNodes, onNodesChange] = useNodesState(skillNodes1);
  const [edges, setEdges, onEdgesChange] = useEdgesState(skillEdges1);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const [isSelected, setIsSelected] = useState(false);
  const {SkillStore} = useStore()
  const handleMouseEnter = () => {
    setIsSelected(true);
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };
  const spanClassName = `${'default-font'} ${isSelected ? 'selected-span' : ''}`;

  const handleOnClick = (x) => {
    
    SkillStore.setNowPage(x)
    
  }

	return (
    <div>
      <span
        className={`${SkillStore.now_page === 1?'under-line' : ''} ${spanClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOnClick(1)}
        >
          科技树
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span
        className={`${SkillStore.now_page === 2?'under-line' : ''} ${spanClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOnClick(2)}>
          绯红魔法书
      </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span
        className={`${SkillStore.now_page === 3?'under-line' : ''} ${spanClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleOnClick(3)}>
          世界树
      </span>
      <ReactFlowProvider >
		  <SwitchFlow></SwitchFlow>
      </ReactFlowProvider >
    </div>
  )
  
}

export default observer(SkillTree)