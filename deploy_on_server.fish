# Backend
conda activate smbackend
cd back-end
cd ScarletMana
python manage.py makemigrations
python manage.py migrate
nohup python manage.py runserver 0.0.0.0:8000 --noreload > sm.log 2>&1 &
cd ..
cd ..

# Frontend
# cd front-end
# sudo yarn start &
# cd ..
