# 数值设计 Numerical Design

## 1. 概述

* 本文档用于描述游戏的数值设计
* 例如：
  * 如何计算出每秒钟玩家的金币收益？
  * 如何计算出玩家的战斗力？
  * 如何计算出玩家每轮矿物收获的时间间隔？
  * etc

## 2. 基本机制

### 2.1 玩家的基本属性

* 玩家有三大资源
  * 法力、金币、矿物
  * 玩家可以通过 **收获** 机制来获取。
* 玩家有矮人资源
  * 空闲、矿工、商人、佣兵
  * 玩家可以通过 **雇佣** 或 **收获** 机制来获取

### 2.2 收获

#### 2.2.1 收获的基本概念

* 游戏每隔一段时间，会给玩家产出一定数量的资源，这个机制被称为 **收获**
* 三大基本资源和矮人，各自的产出时间、产出数量、计时器，都相互独立。
* 属性有：
  * *resource*_harvest_interval：每轮收获的 **时间间隔**
  * *resource*_harvest_base：每轮收获量的 **基础产出**
  * *resource*\_harvest_dwarf_multiple：每轮收获量的 **倍数产出**
  * 【注：*resource*需要替换为mana/coin/mineral/dwarf】
* 比如，玩家一轮能收获的金币数量为 $coin\_delta = coin\_harvest\_base + coin\_harvest\_dwarf\_multiple * merchant\_num$
  * $merchant\_num$ 为玩家雇佣的商人数量
* 比如，玩家金币收获的时间间隔为 $coin\_harvest\_interval$

#### 2.2.2 收获的总结

* 每个游戏帧，需要考虑以下内容

  * 金币收获
    * 受到以下值的影响：金币收获基本产出、金币收获倍数产出、商人数量、矮人总数量（要付工资！！！）

  * 法力收获
    * 受到以下值的影响：法力收获基本产出、法力收获倍数产出、佣兵数量
  * 矿物收获
    * 受到以下值的影响：矿物收获基本产出、矿物收获倍数产出、矿工数量
  * 矮人收获
    * 需要特殊科技才能触发

* 具体公式请参照游戏源码

#### 2.2.3 收获的初始值

| ...  | 基本产出 | 倍数产出 | 时间间隔(s) |
| ---- | -------- | -------- | ----------- |
| 法术 | 0        | 1        | 10          |
| 金币 | 1        | 2        | 10          |
| 矿物 | 0        | 1        | 10          |
| 矮人 | 0        | -        | 600         |

* 为什么金币的初始倍数产出为2呢？
  * 因为矮人通过卖矿石来获取金币，如果卖1个矿石只能获取1个金币，那么说明2个矮人才能获取一个金币，看起来不那么有意思，所以这里设置为2，表明平均情况下，1个矮人每轮即可获取1个金币

## 3. 技能

### 3.1 技能的基本概念

* 本游戏有技能以及技能树，可以对游戏提供增益

### 3.2 技能的属性

#### 3.1 基本属性（文字描述，与数据无关）

* ID
* 名称
* 效果描述
* 背景描述

#### 3.2 学习这个技能的花费（即时结算）

* 前置魔法的ID
* 法力花费
* 金币花费
* 矿物花费
* 空闲矮人花费
* 矿工矮人花费
* 商人矮人花费
* 佣兵矮人花费

* 【注：如果花费为负数，代表此属性为即时结算的增益。】

#### 3.3 这个技能的增益（持久Buff）

* 每轮法力收获，**基本产出** 增加X点
* 每轮金币收获，**基本产出** 增加X点
* 每轮矿物收获，**基本产出** 增加X点
* 每轮矮人收获，**基本产出** 增加X点
* 每轮法力收获，**矮人倍数** 增加X点
* 每轮金币收获，**矮人倍数** 增加X点
* 每轮矿物收获，**矮人倍数** 增加X点
* 每轮法力收获，**时间间隔** 减小X点（至少为1）
* 每轮金币收获，**时间间隔** 减小X点（至少为1）
* 每轮矿物收获，**时间间隔** 减小X点（至少为1）
* 每轮矮人收获，**时间间隔** 减小X点（至少为1）
* 雇佣矮人价格降低X点（至少为1）
* 矮人工资降低X点

#### 3.4 特殊效果（持久Buff）

* 这部分因为难以预计，可能需要硬编码，无法储存在关系型数据库中。

***

## 4. 资源数值设计

### 4.1 概述

* 放置类游戏的数值设计极度重要，因为这是整个游戏的核心。
* 如果玩家成长过慢，那么会使得玩家失去成长的动力；如果玩家成长过快，那么会使得游戏寿命大幅缩短。找到一个平衡的数值设计，变得至关重要。

### 4.2 资源循环

* 10个金币 => 1个矮人
* 1个矮人 => 1个金币
* 1个矮人 => 1个矿物
* 1个矮人 => 1点法力
* 3个矮人 => -1个金币
  * 工资；为了避免数值膨胀，需要在矮人过多时限制金币增长速率；

### 4.3 大概阶段划分

* 最开始时，10s，+1金币，+0法力，+0矿物
* 点出技能1/2/3后，10s，+2金币，+2法力，+0矿物
  * 需要2分钟达到（如果玩家不点矮人的话）
* 点出技能1/2/3 + 4位矮人，10s，+5金币，+2法力，+0矿物
  * 需要5分钟达到（最优策略）

### 4.4 技能设计指引

* 因为矮人数量是玩家的核心可再生资源，所以 **一定一定** 要非常注意 **矮人倍数** 这一属性的提高。这一属性提高，会使得玩家的数值进入到一个新的阶段，数值大幅膨胀。所以在设计技能时，优先提高玩家的 **基础产出**，再一些十分关键的技能上，再提高玩家的 **矮人倍数**。

