import {computed, makeAutoObservable} from 'mobx'
import {http, setTokenFromLocalStorage, getTokenFromLocalStorage} from '../utils'
class MessageStore {
  maxLength = 30

  messages = []
  buffer_messages = []
	input_text = []
  constructor() {
		this.messages = this.messages.slice(-this.maxLength)
		makeAutoObservable(this,{
			reversedMessages : computed
		})
		
		
		
      async function getMessage() {
        const ret = await http.post('/api/message', {
          token:getTokenFromLocalStorage()
        })
        return ret
      }
      const ret = getMessage()
      ret.then(res => {
				var jsonArray = res.data.message;
				console.log(jsonArray)
				for(var i = 0; i < jsonArray.length; ++i) {
					this.buffer_messages.push(jsonArray[i])
				}
      }).catch(e => {
        console.log(e)
      })
    

		setInterval(() => {
      if(this.buffer_messages.length > 0) {
				var firstElement = this.buffer_messages.shift();
				this.addMessage(firstElement)
			}
    }, 1000);

  }
  get reversedMessages() {
		return this.messages.slice().reverse();
	}
  addMessage = (newMessage) => {
    
		const newItem = {
			id: Date().now,
			content: newMessage,
			showTransition:false
		}
		this.messages.push(newItem)
    if (this.messages.length > this.maxLength) {
      this.messages = this.messages.slice(-this.maxLength)
    }
		setTimeout(() => {
			this.setMessages(this.messages.map((item) => item.id===newItem.id? {...item,showTransition: true} : item));
		}, 50);
  }
	setMessages = (newMessages) => {
		this.messages = newMessages
	}
	setInputText = (new_text) => {
		this.input_text = new_text
	} 
	getChatMessage = (message) => {
		this.addMessage('你祈祷: '+message)
		function getMessage() {
			const ret = http.post('api/llm/chat', {
				token:getTokenFromLocalStorage(),
				message : message,
				target: 'Neko',
				username: 'admin'
			})
			return ret
		}
		const ret = getMessage()
		console.log(ret)
		ret.then(res => {
			if(res.data.state === 'success') {
				this.addMessage('祂回应: '+res.data.message);
			}
			else {
				this.addMessage(res.data.error_message);
			}
		}).catch(e => {
			console.log(e)
		})
	}
}

export default MessageStore