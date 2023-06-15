import React,{useState} from 'react';
import { observer } from 'mobx-react-lite'

import './main.css'
import { useStore } from '../store';

function MessageBox() {
	const {MessageStore} = useStore()
	const [count, setCount] = useState(0)
	const onClickHandler = ()=> {
		MessageStore.addMessage(count)
		setCount(count + 1)
	}

	return (
		<div className='message-box' >
			{MessageStore.reversedMessages.map((item,index) => (
				<div key={index}
					className={`fade-in ${item.showTransition ? 'active' : ''}`} 
					>
						{item.content}
						<br></br>
				</div>))}
			{/* <button onClick={onClickHandler}> {count}</button> */}
		</div>
	)
}

export default observer(MessageBox)