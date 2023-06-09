# Scarlet Mana - Game Design

## 1. 基本信息

- 一个网页端的文字游戏
- 理念：一个持续不断运行的世界，玩家可以通过网站访问，就算玩家不在，游戏内的时间也会继续流逝。
  - 实际上就是资源不断变多而已
- 玩法：模拟经营、放置类
- 世界观：Dragon And Dungeon
- 背景：玩家是一名希望成为传奇魔法师的矮人矿场老板

## 2. 机制

- 资源
  - 游戏中共有四种资源：金币、法力、矿物、佣兵
  - 法力：衡量玩家法术水平的数值，代表了玩家目前的战斗力、魔法能力。可以理解成：等级/经验值。
  - 金币：游戏中的基础货币。可以用金币雇佣矮人，购买装备等
  - 矿物：可以用于出售，或者打造装备（科技树），提升战斗力。
  - 佣兵：可以提升玩家战斗力。
  - [前端：显示资源]
  - [后端]
  - [数据库：玩家资源表]
- 资源循环
  - 金币雇佣矮人
  - 矮人开采矿物
  - 矿物换取金币
- 战斗系统
  - 玩家和矮人佣兵会持续不断地讨伐怪物，提升玩家的法力值。
  
  - 战斗力受到以下三者因素的影响：法力值、技能树/科技树、佣兵数量
  
  - [前端：信息面板(输出各种事件信息)]
  
  - [后端]
  
  - [数据库]
  
- 雇佣矮人
  - 玩家可以 **花费金币雇佣矮人**，并派遣矮人执行不同的任务
  - 矮人可以执行不同的任务：矿工、商人、佣兵
    - 矿工：矿工会持续不断地 进入矿场 **采集矿物**
    - 商人：商人会持续不断地 **出售矿物换取金币**
    - 佣兵：佣兵会持续不断地 讨伐怪物
  - [前端：显示矮人分配情况、分配员工(8个按钮)]
  - [后端]
  - [数据库：玩家表(存玩家及其矮人)、矮人信息表(存矮人及其职业)]
- 技能树/科技树
  - 可以使用法力来点技能、或者用金币与矿物升级装备等
  - 举例
    - 玩家可以使用法力来开发技能 `Fire Ball`，能提高战斗力
    - 玩家可以使用金币与矿物，升级矮人佣兵的装备，提高战斗力
  - [前端：显示科技树、发展科技]
  - [后端：科技树逻辑、Buff逻辑]
  - [数据库：科技树（存科技树本身）、玩家科技(存玩家选了哪些科技，主键:玩家ID、科技ID)]
  - 科技树，外键依赖本表主键
- 排行榜
  - [前端：显示排行榜]

## 3. 技术

- 前端 React：提供按钮等；
- 后端 Django：操作数据库等；
- 数据库 MySQL：账户、账户密码；玩家资源；

