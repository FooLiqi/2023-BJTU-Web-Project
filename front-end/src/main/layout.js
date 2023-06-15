import React,{ useCallback,useState } from 'react';
import { observer } from 'mobx-react-lite'
import ResourceComponent from './resourceComponent';
import './main.css'
import MessageBox from './messageBox';
import OperationComponent from './operationComponent';
import 'reactflow/dist/style.css';
import { skillNodes as initialNodes, skillEdges as initialEdges} from './skillElement.js';
import { Carousel, Radio } from 'antd';
import SkillTree from './skillTree';
import { useStore } from '../store';
const MyComponent = observer ( () => {
	const {MessageStore} = useStore()

  const handleChange = (event) => {
		
    MessageStore.setInputText(event.target.value)
		
  };
  return (<textarea
		className="my-textarea"
		value={MessageStore.input_text}
		onChange={handleChange}
		rows={4}
	/>)
});
function MainLayout  ()  {
	const [isSelected, setIsSelected] = useState(false);
	const {MessageStore} = useStore()
  const handleMouseEnter = () => {
    setIsSelected(true);
  };

  const handleMouseLeave = () => {
    setIsSelected(false);
  };
  const spanClassName = `${'default-font'} ${isSelected ? 'selected-span' : ''}`;
	function handleClick() {
		MessageStore.getChatMessage(MessageStore.input_text)
		MessageStore.setInputText('')
	}
	return (
	<div>
	
	<div className= 'layout'>
		
		<div className = 'left-layout'>
			<div className='message-container'>
				<MessageBox className = 'top-component'/>
				<div className = 'bottom-component'>
				<MyComponent ></MyComponent>
					<div className = 'bottom-component-right'>
						<span className={spanClassName}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							onClick={()=>handleClick()}
							>
								祈<br></br>祷
						</span>
					</div>
				</div>
			</div>
		</div>
		<div className = 'right-layout'>
			<div className='right-up-layout'>
				<div className='container'>
				<OperationComponent></OperationComponent>
				<ResourceComponent></ResourceComponent>
				</div>
			</div>
			<div style={{ width: '50vw', height: '70vh' }}>
				<Carousel dotPosition='top' effect="fade" >
					<div>
						<SkillTree></SkillTree>
					</div>
				</Carousel>
			</div>
			
		</div>
		
	</div>
	</div>
)
}

export default observer(MainLayout)