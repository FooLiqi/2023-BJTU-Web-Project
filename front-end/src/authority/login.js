import React from 'react';
import styles from './login.module.css';
import  './login.css';
import {message, Form, Input, Button, Card } from 'antd';
import logo from '../assets/logo.png'
import { useStore } from '../store';
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
function LoginForm  ()  {
  const {loginStore} = useStore()
  const navigate = useNavigate()
  var button_state = ''
  async function handleLoginFinish(values) {
    console.log(button_state)
    console.log('Login form values:', values);
    // 处理登录逻辑
    if(button_state === 'login') {
      try {
        await loginStore.getTokenByLogin({
          username: values.username,
          password: values.password
        })
        navigate('/', {replace:true})
        message.success('登录成功')
      } catch(e) {
        console.log(e)
        if(e.response)
          message.error(e.response.data.error_message)
        else message.error(e.message)
      }
    }
    // 处理注册逻辑
    if(button_state === 'register') {
      try {
        await loginStore.getTokenByRegister({
          username: values.username,
          password: values.password
        })
        message.success('注册成功')
        navigate('/', {replace:true})
        
      } catch(e) {
        message.error(e.response.data.error_message)
      }
    }
  };

  const clickRegisterHandler = () => {
    button_state = 'register'
  }
  const clickLoginHandler = () => {
    button_state = 'login'
  }
  return (
    
        <div className='login-container'>
          
          
           <div className="login-form">
            
            <img className='login-form-inner' src = {logo} alt=''></img>
            
            <Form onFinish={handleLoginFinish}   >
              <Form.Item
                name="username" 
                rules={[{ required: true, message: '请输入用户名' }]}
                
              >
                <Input  placeholder="登录用户名" className='lovekdl' /> 
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password placeholder="密码" className={'lovekdl'}   />
              </Form.Item>

              <Form.Item className='login-form-inner'>
                <Button type="primary" htmlType="submit"  shape = 'default' onClick={clickLoginHandler}  >
                  登录
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '50px' }}  onClick={clickRegisterHandler} >
                  注册
                </Button>
              </Form.Item>

            </Form>
          </div> 
          
        </div>
      
  );
};

export default observer(LoginForm);
