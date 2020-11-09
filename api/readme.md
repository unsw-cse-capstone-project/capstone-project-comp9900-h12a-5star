# API
In this section you will find all the APIs which have been created for this project. 

## Technology Stack
Python , Django and Memcache

## Installation Steps
- Install Memcache application to your local system
 1)If you run Linux, you can install it using apt-get install memcached or yum install memcached. This will install memcached from a pre-built package .
 2)For macOS, using Homebrew is the simplest option. Just run brew install memcached after you’ve installed the Homebrew package manager.
 3)On Windows, you would have to compile memcached yourself or find pre-compiled binaries.
 
 For Windows 64, download zip from this link :
http://downloads.northscale.com/memcached-1.4.5-amd64.zip

Unzip the downloaded file and run the memcached.exe application before you runserver.This should be everytime

- Install Mongo Compass community version and connect to localhost

- Create conda environment and install requirements.txt
```(bash)
python3 -m pip install -r requirement.txt
```

- activate conda environment and cd the api directory

- run the following commands
```(bash)
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
=======
