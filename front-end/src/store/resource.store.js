import {computed, makeAutoObservable} from 'mobx'
import {http} from '../utils'
import { getTokenFromLocalStorage } from '../utils'
class ResourceStore {
  
  coin = 0
  dwarf = 0
  mana = 0
  merchant = 0
  miner = 0
  mineral = 0
  soldier = 0

  constructor() {
		makeAutoObservable(this)
    setInterval(() => {
      async function getResources() {
        const ret = await http.post('/api/resource', {
          token:getTokenFromLocalStorage()
        })
        return ret
      }
      const ret = getResources()
      ret.then(res => {
        this.setMana(res.data.mana)
        this.setCoin(res.data.coin)
        this.setDwarf(res.data.dwarf)
        this.setMerchant(res.data.merchant)
        this.setMiner(res.data.miner)
        this.setMineral(res.data.mineral)
        this.setSoldier(res.data.soldier)
      }).catch(e => {
        console.log(e)
      })
    }, 200);
  }
  setMana = (mana)=> {
		this.mana = mana
	}
  setDwarf = (dwarf)=> {
		this.dwarf = dwarf
	}
  setCoin = (coin)=> {
		this.coin = coin
	}
  setMerchant = (merchant)=> {
		this.merchant = merchant
	}
  setMiner = (miner)=> {
		this.miner = miner
	}
  setMineral = (mineral)=> {
		this.mineral = mineral
	}
  setSoldier = (soldier)=> {
		this.soldier = soldier
	}
  
}
//商人 矿工 战士
export default ResourceStore