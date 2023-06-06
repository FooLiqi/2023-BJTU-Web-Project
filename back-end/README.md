# Back-end README

### 1. Install & Use

* 请先配置好MySQL数据库

  * 数据库名：`scarletmana`

* ```  
  conda create -n smbackend python=3.7
  conda activate smbackend
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
  cd ScarletMana
  python manage.py runserver 0.0.0.0:8000
  ```

### 2. 开发注意事项

#### 2.1 ORM的线程安全问题

* ORM为线程不安全，所以需要自己实现线程锁

* 任何对数据库中记录的 **访问**，请均加上对该记录（对象）互斥锁的调用

  * ```python
    player = Players.objects().all().first()
    with player.lock:
        # do something you want
    ```

* 如何判断我现在要不要获取锁？

  * 如果你访问了任何 `player.attribute/method`，那么就需要获取锁。
  * 如果你只是拿着 `player` 跑，那么就不需要获取锁
