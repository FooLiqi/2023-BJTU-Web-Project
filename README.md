# 2023-BJTU-Web-Project

> 北京交通大学 软件学院 2023春季 实训课 Web大作业

## 1. Introduction

## 2. 协议

### 2.1 基本约定

- 所有请求均使用 `POST` 方法


### 2.2 账号相关

#### 2.2.1 注册

- `api/register/`
- 前端TO后端
  - username：账户名
  - password：密码
- 后端TO前端
  - state：状态。若成功则为 `success`；若失败则为 `error`
  - error_message：错误原因
  - token：令牌（只有在成功时才有值）

#### 2.2.2 登录

* `api/login/`
* 前端TO后端
  - username：账户名
  - password：密码
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * token：令牌（只有在成功时才有值）

#### 2.2.3 获取资源

* `api/resource/`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * mana：法力
  * coin：金币
  * mineral：矿物
  * dwarf：矮人
  * miner：职业为矿工的矮人数量
  * merchant：职业为商人的矮人数量
  * soldier：职业为佣兵的矮人数量

#### 2.2.4 雇佣矮人

* `api/employ/`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * 接下来的属性均为雇佣矮人的属性
  * firstname：名
  * secondname：姓
  * sex：性别
  * strength
  * dexterity
  * constitution
  * intelligence
  * wisdom
  * charisma

#### 2.2.5 修改矮人职业

* 所有修改均采用同一协议，只有URI不同
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因

##### 2.2.5.1 增加矿工

* `api/dwarf/addMiner`

##### 2.2.5.2 减少矿工

* `api/dwarf/subtractMiner`

##### 2.2.5.1 增加商人

* `api/dwarf/addMerchant`

##### 2.2.5.2 减少商人

* `api/dwarf/subtractMerchant`

##### 2.2.5.1 增加佣兵

* `api/dwarf/addSoldier`

##### 2.2.5.2 减少佣兵

* `api/dwarf/subtractSoldier`

