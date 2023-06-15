import {computed, makeAutoObservable} from 'mobx'
import {http, setTokenFromLocalStorage, getTokenFromLocalStorage} from '../utils'
import React, { useState,useEffect } from 'react';
import { Table, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';


const HeartButton = ({ record }) => {
  const [isLiked, setIsLiked] = useState(record.following);

  // useEffect(() => {
    
  //   console.log('Component initialized');
  //   console.log(record.following)
  //   console.log(isLiked)
  // }, []);

  const handleClick = () => {
    async function postSub() {
      const ret = await http.post('api/leaderboard/subscribe', {
        token:getTokenFromLocalStorage(),
        followed : record.UID,
      })
      return ret
    }
    const ret = postSub()
    ret.then(res => {
      console.log(res)
      if(res.data.state === 'success'){
        if(res.data.message === 'successfully subscribe') {
          setIsLiked('true')
        }
        else if(res.data.message === 'successfully unsubscribe'){
          setIsLiked('false')
        }
      }
    }).catch(e => {
      console.log(e)
    })
  };
  
  const buttonIcon = isLiked ? <HeartFilled /> : <HeartOutlined />;

  return (
    
    <IconButton onClick={handleClick} color={isLiked==='true' ? 'error' : 'default'}>
      {isLiked==='true' ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};



class RankStore {
  dataSource = [
    
  ];
  columns = [
    {
      title: '排名',
      dataIndex: 'totalrank',
      key: 'totalrank',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '法力值',
      dataIndex: 'mana',
      key: 'mana',
    },
    {
      title: '关注',
      dataIndex: 'subscribe',
      key: 'subscribe',
      render: (text, record) => <HeartButton record={record} />,
    },
    
  ];
  constructor() {
		makeAutoObservable(this)
  }
  getDataSource = () => {
    return this.dataSource
  }
  setDataSource = (newData) => {
    this.dataSource = newData
  }
  getColumns = () => {
    return this.columns
  }
  getRanking = async () => {
    try {
      const ret = await http.post('api/leaderboard/mana', {});
      if (ret.data.state === 'success') {
        let nowKey = 0;
        const newData = [];
        for (let key in ret.data) {
          if (typeof ret.data[key] === 'object' && ret.data[key] !== null) {
            const item = ret.data[key];
            item.key = item.UID
            nowKey++;
            newData.push(item);
            console.log(item);
          }
        }
        this.setDataSource(newData);
      } else {
        console.log(ret);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getOnlySubscribed = async() => {
    try {
      const ret = await http.post('api/leaderboard/subscribe/mana', {});
      if (ret.data.state === 'success') {
        console.log(ret.data)
        let nowKey = 0;
        const newData = [];
        console.log(ret.data)
        for (let key in ret.data) {
          if (typeof ret.data[key] === 'object' && ret.data[key] !== null) {
            const item = ret.data[key];
            item.key = item.UID
            newData.push(item);
            console.log(item);
          }
        }
        this.setDataSource(newData);
      } else {
        console.log(ret);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default RankStore