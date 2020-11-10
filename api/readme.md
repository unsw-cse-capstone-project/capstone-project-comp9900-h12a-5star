# API
In this section you will find all the APIs which have been created for this project. 

## Technology Stack
Python , Django and Memcache

## Installation Steps for linux interface
- Install Memcache application to your local system
 1)If you run Linux, you can install it using apt-get install memcached or yum install memcached. This will install memcached from a pre-built package .
 2)For macOS, using Homebrew is the simplest option. Just run brew install memcached after you’ve installed the Homebrew package manager.
 3)On Windows, you would have to compile memcached yourself or find pre-compiled binaries.
 
 For Windows 64, download zip from this link :
http://downloads.northscale.com/memcached-1.4.5-amd64.zip

Unzip the downloaded file and run the memcached.exe application before you runserver.This should run everytime

- Make sure you have sqlite3 installed

- Upgrade pip and create python3 environment and activate the new environment
'''(bash)
python3 -m pip install --upgrade pip
python3 -m pip install --user --upgrade pip

python3 -m pip install --user virtualenv
python3 -m venv env
source env/bin/activate
'''

- cd to api directory

- pip install requirements.txt
```(bash)
python3 -m pip install -r requirement.txt
```

- run the following commands
```(bash)
python3 manage.py makemigrations user
python3 manage.py makemigrations profile
python3 manage.py makemigrations movie_review
python3 manage.py makemigrations notifications

python3 manage.py migrate user
python3 manage.py migrate profile
python3 manage.py migrate movie_review
python3 manage.py migrate notifications

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
=======
