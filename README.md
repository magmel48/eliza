you are digital repo
====================

to connect with touchdesigner soft
----------------------------------

1. Install Python3.6
2. Install pip
3. Install pipenv
4. Run `pipenv install` in python directory of touchdesigner-firebase folder
5. Run `pipenv run python firebase-osc.py` in python directory of touchdesigner-firebase folder

to connect with amazon s3 storage
---------------------------------

1. Install Node.js
2. Install npm if it was not with Node.js installer package
3. Specify Amazon credentials as it described in `ws-amazon-upload` directory
4. Run `npm start`

to run website in development mode (without firebase on board)
--------------------------------------------------------------

1. Install Node.js
2. Install npm if it was not with Node.js installer package
3. Run `npm start` in website-firebase directory

to deploy website into production
---------------------------------

1. Install Node.js
2. Install npm if it was not with Node.js installer package
3. Run `firebase deploy` in website-firebase directory
