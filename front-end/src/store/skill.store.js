import {computed, makeAutoObservable} from 'mobx'
import {http} from '../utils'
import { getTokenFromLocalStorage } from '../utils'
import {message} from 'antd'
class SkillStore {
  
  skill_list = []
  learned_skills = []
  now_page = 1

  flow = null
  constructor() {
		makeAutoObservable(this,{
			getSkillList : computed
		})
    console.log('haha')
    async function getSkills() {
      console.log('start')
      const ret = await http.post('api/skill/query_all_skills', {
        token:getTokenFromLocalStorage(),
      })
      return ret
    }
    const ret = getSkills()
    ret.then(res => {
      this.setSkillList(res.data.data);
      //console.log(this.skill_list[0].name)
    }).catch(e => {
      console.log(e)
    })
    
    async function getLearnedSkills() {
      const ret = await http.post('api/skill/query_learned_skills', {
        token:getTokenFromLocalStorage(),
      })
      return ret
    }
    
    const ret2 = getLearnedSkills()
    ret2.then(res => {
      this.learned_skills = res.data.learned_skills;
    }).catch(e => {
      console.log(e)
    })

  }
  setNowPage = (x) => {
    this.now_page = x
  }
  setLearnedSkills = (newSkills) => {
    this.learned_skills = newSkills;
  }
  updateSkills = async() => {
    try {
      const ret = await http.post('api/skill/query_all_skills', {
        token:getTokenFromLocalStorage(),
      })
      this.setSkillList(ret.data.skill_list)
    }
    catch(e) {
      console.log(e)
    }
    try{
      const ret = await http.post('api/skill/query_learned_skills', {
        token:getTokenFromLocalStorage(),
      })
      this.setLearnedSkills(ret.data.learned_skills)
      //this.learned_skills = ret.data.learned_skills;
      
    }
    catch(e) {
      console.log(e)
    }

  }
  updateLearnedSkills = async() => {
    try{
      const ret = await http.post('api/skill/query_learned_skills', {
        token:getTokenFromLocalStorage(),
      })
      this.setLearnedSkills(ret.data.learned_skills)
      //this.learned_skills = ret.data.learned_skills;
      
    }
    catch(e) {
      console.log(e)
    }
  }
  learnSkill = async(skill_id) => {
    console.log('start'+skill_id)
    try{
      
      const ret = await http.post('api/skill/learn', {
        token:getTokenFromLocalStorage(),
        skill_id:skill_id
      })
      console.log('end')
      console.log(ret.data)
      if(ret.data.state === 'success') {
        message.success('学习成功')
      
      }
      else {
        message.error(ret.data.error_message)
      }
    }
    catch(e) {
      if(e.response)
          message.error(e.response.data.error_message)
        else message.error(e.message)
    }
  }

  checkLearned = (x) => {
    this.updateLearnedSkills()
    if(x in this.learned_skills) return true
    return false
  }
  setSkillList = (newList) =>{
    this.skill_list = newList;
  }
  get getSkillList() {
    return this.skill_list
  }
  
}
export default SkillStore