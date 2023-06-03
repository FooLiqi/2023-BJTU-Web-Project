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
