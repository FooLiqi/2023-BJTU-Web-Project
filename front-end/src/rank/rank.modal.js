import {Modal} from 'antd'
import { useEffect,useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Checkbox ,Table} from 'antd';
import { useStore } from '../store';
import '../main/main.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';



const HeartButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <IconButton onClick={handleClick} color={isLiked ? 'error' : 'default'}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

function RankModal (props) {
  const {RankStore} = useStore()
  const handleOk = ()=>{
    props.setVisible(false)
  }
  
  useEffect(()=> {
    RankStore.getRanking()
  },[props.visible])

  const onChange = (e) => {
    
    console.log(`checked = ${e.target.checked}`);
    if(e.target.checked == true) {
      RankStore.getOnlySubscribed()
    }
    else {
      RankStore.getRanking()
    }
    
  };

  return (
    <Modal title="排行榜" open={props.visible} onCancel={handleOk} destroyOnClose={true} footer={null} className='default-font'>
      <br></br>
      <Checkbox onChange={onChange}>仅关注</Checkbox>
      <Table className='default-font' dataSource={RankStore.dataSource} columns={RankStore.columns} />
    </Modal>
  )
}

export default observer(RankModal)
