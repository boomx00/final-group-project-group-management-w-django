# CPT202 Group Management System

## Features

- Group System Management
- Membership System to do scrum framework
- Register and Login
- Search suitable group from the topic, tags and development.

# Configuring Django and Django Rest Framework
## 1. installing requirements.txt
head to location with requirements.txt and “pip install -r requirements.txt”. 
## 2. Configuring Database Connection
head to settings.py, change database name, user, password, host to whats appropriate
## 3. migrating the database
Open the terminal again and head to the location with manage.py. Type in the following to make
the migrations of the database
  1. Python manage.py makemigrations
  2. Python manage.py migrate
## 4. Running the server
Then in the terminal type in
  1. Python manage.py runserver YourIpAddress:8000, for example `python
manage.py runserver 192.192.192.1:8000`

## 5. Configuring the Base Urls
head to the directory of backend-django/android/users/view.py, and look for base_url.
change the base url accordingly to the IP address used when running the server.


# Configuring sockets and MongoDB
  1. press fill in connection fields individually and press connect

  2. Open terminal and head to the directory groupmanagement and type the following
    -`npm install`
    -`npm install socket.io-client`
    -`npm install --save react-native-push-notification`
  3. open the file mainscreen.js located in groupmanagement/src/screens/MainScreen/MainScreen.js, and change the ip address
on the socket into your ip address:3005
6. in terminal, head to the directory socket-backend and type npm start

Run the emulator, run `npm start` in groupmanagement directory, app should load

## MAKE SURE THE FOLLOWING ARE INSTALLED
1. python 3
2. React-Native
3. android studio
4. MySQL
5. MongoDB
