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

### 2.3 资源相关

#### 2.3.1 获取资源

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

### 2.4 矮人相关

#### 2.4.1 雇佣矮人

* `api/employ/`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * message：信息面板内容
    * 这是一个 **JSON数组**
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

#### 2.4.2 修改矮人职业

* 所有修改均采用同一协议，只有URI不同
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * message：信息面板内容
    * 这是一个 **JSON数组**

##### 2.4.2.1 增加矿工

* `api/dwarf/addMiner`

##### 2.4.2.2 减少矿工

* `api/dwarf/subtractMiner`

##### 2.4.2.1 增加商人

* `api/dwarf/addMerchant`

##### 2.4.2.2 减少商人

* `api/dwarf/subtractMerchant`

##### 2.4.2.1 增加佣兵

* `api/dwarf/addSoldier`

##### 2.4.2.2 减少佣兵

* `api/dwarf/subtractSoldier`

### 2.5 信息面板

#### 2.5.1 读取信息面板欢迎信息

* `api/message/`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * message：信息面板内容
    * **注意**，这里的message是一个 **JSON数组**

### 2.6 排行榜

#### 2.6.1 金币排行榜

* `api/leaderboard/coin`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * coin：玩家的金币数
    * following：是否正在关注该玩家
    * totalrank：玩家在总榜上的排名

#### 2.6.2 魔法排行榜

* `api/leaderboard/mana`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * mana：玩家的法力值
    * following：是否正在关注该玩家
    * totalrank：玩家在总榜上的排名

#### 2.6.3 矿物排行榜

* `api/leaderboard/mineral`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * mineral：玩家的矿物数
    * following：是否正在关注该玩家
    * totalrank：玩家在总榜上的排名

#### 2.6.4 关注玩家

* `api/leaderboard/subscribe`
* 前端TO后端
  * token：令牌
  * followed：关注的玩家ID
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * message：具体信息。
    * `successfully unsubscribe` 为成功取消关注
    * `successfully subscribeD` 为成功关注
    * `You always follow yourself. You are the only one who can own the power of ScarletMana!` 你永远关注着你自己，你可是要掌握绯红魔法的人！

#### 2.6.5 关注玩家金币榜

* `api/leaderboard/subscribe/coin`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * coin：玩家的金币数
    * totalrank：玩家在总榜上的排名
    * following：是否正在关注该玩家

#### 2.6.6 关注玩家魔法榜

* `api/leaderboard/subscribe/mana`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * mana：玩家的法力值
    * totalrank：玩家在总榜上的排名
    * following：是否正在关注该玩家

#### 2.6.7 关注玩家矿物榜

* `api/leaderboard/subscribe/mineral`
* 前端TO后端
  * token：令牌
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * rank{i}：排行榜上第i个玩家的信息，包括以下信息
    * UID：玩家的id
    * username：玩家的用户名
    * mineral：玩家的矿物数
    * totalrank：玩家在总榜上的排名
    * following：是否正在关注该玩家

### 2.7 技能相关

#### 2.7.1 查看技能列表

* `api/skill/query_all_skills`

* 前端TO后端

  * token：令牌

* 后端TO前端

  * state：状态。若成功则为 `success`；若失败则为 `error`

  * error_message：错误原因

  * data：数据库详细信息

    * data是一个List

    * List中的每个元素是一个Dictionary

    * Dictionary包含以下键值对

      * "id": int
        * ID
      * "name": string
        * 名字
      * "effect_describe": string
        * 效果描述
      * "background_describe": string
        * 背景描述
      * "precondition": int
        * 前置技能ID
      * "mana_cost", "coin_cost", "mineral_cost"
        * 资源花费，需要有这些资源，才可以学习这个技能
        * **注意！**这些Key **可能不存在**，不存在时，则表示对这个资源 **没有需求**
      * "dwarf_limit"
        * 矮人限制，需要有这些数量的矮人，才可以学习这个技能
        * 只对数量进行限制，不消耗矮人
        * **注意！**这个Key **可能不存在**，不存在时，则表示对这个资源 **没有限制**

    * 例子：

      ```json
      [
          {
              "id": 1,
              "name": "失落的绯红魔法书",
              "effect_describe": "矿场中的这本失落魔法书让你开始学习魔法...",
              "background_describe": "\"潘多拉的魔盒被打开了...\"",
              "precondition": 0,
              "coin_cost": 1
          },
          {
              "id": 2,
              "name": "魔法书的扉页",
              "effect_describe": "你开始了解到了这本书蕴藏的强大力量",
              "background_describe": "[写在魔法书扉页上的文字]",
              "precondition": 1,
              "mana_cost": 5
          },
              {
              "id": 3,
              "name": "照明术",
              "effect_describe": "可以让你照亮周围的环境",
              "background_describe": "你从镇上的市场中购...",
              "precondition": 1,
              "coin_cost": 10
          }
      ]
      ```

#### 2.7.2 学习技能

* `api/skill/learn`
* 前端TO后端
  * token：令牌
  * skill_id：想学习的技能ID
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因

#### 2.7.3 查看玩家所学习的所有技能ID

* `api/skill/query_learned_skills`

* 前端TO后端

  * token：令牌

* 后端TO前端

  * state：状态。若成功则为 `success`；若失败则为 `error`

  * error_message：错误原因

  * learned_skills：已经学习到的技能

    * 这是一个List，里面每个元素都是一个Integer，表示技能的ID

    * 保证元素从小到大

    * 例：

      ```json
      [1, 2]
      ```

### 2.8 LLM

#### 2.8.1 Chat

* `api/llm/chat`
* 前端TO后端
  * username：字符串，表示用户名称（目前没有作用）
  * target：对话目标
    * 比如设置为"Neko"的话，就会自动触发猫娘人设
  * message：对话内容
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因
  * message：LLM的返回信息

#### 2.8.2 Reset

* `api/llm/reset`
* 前端TO后端
  * 无
* 后端TO前端
  * state：状态。若成功则为 `success`；若失败则为 `error`
  * error_message：错误原因

