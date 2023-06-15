import './App.css'
import React from 'react'
import MainLayout from './main/layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './authority/index'
import { observer } from 'mobx-react-lite'
import { AuthComponent } from './components/authComponent'

const App = () => {
  return (
    <Router>
      <Routes>
      
      <Route path = "/" element={<AuthComponent><MainLayout className={'qwq'}></MainLayout></AuthComponent>} />
      
      <Route path = "/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default observer(App);
