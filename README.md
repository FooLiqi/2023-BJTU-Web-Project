# 2023-BJTU-Web-Project

> 北京交通大学 软件学院 2023春季 实训课 Web大作业

## 1. Introduction

## 2. 协议

### 2.1 基本约定

- 第一个: 前端 => 后端

- 第二个: 后端 => 前端

### 2.2 账号相关

#### 2.2.1 注册

- `POST`
- `api/register/`
- 前端TO后端
  - username：账户名
  - password：密码
- 后端TO前端
  - state：状态。若成功则为 `success`；若失败则为 `error`
  - message：错误原因
  - token：令牌（只有在成功时才有值）

#### 2.2.2 登录

* `POST`
* `api/login/`
* 前端TO后端
  - username：账户名
  - password：密码
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * message：错误原因
  * token：令牌（只有在成功时才有值）

#### 2.2.3 获取资源

* `POST`
* `api/resource/`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * message：错误原因
  * mana：法力
  * coin：金币
  * mineral：矿物
  * dwarf：矮人
