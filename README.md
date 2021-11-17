# Oauth-And-JWT

To run this experiment 

step 1)clone this repository and navigate to folder.
step 2)run npm install.
step 3)create database of name itl.
step 4)create table users inside itl database with fields email(primary key) and password.
step 5)now go to Google Developers Console website and create new OAuth 2.0 Client and generate GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET.
step 6)now go to Facebook Developers website and create new application and generate FACEBOOK_APP_ID,FACEBOOK_APP_SECRET.
step 7)now go to Twitter Application Management website and create new application and generate TWITTER_CONSUMER_KEY,TWITTER_CONSUMER_SECRET.
step 7)create .env file and add all above keys and secrets in it
step 8)run code using node app.js

References:
1)https://www.passportjs.org/packages/passport-google-oauth20/
2)https://www.passportjs.org/packages/passport-facebook/
3)https://www.passportjs.org/packages/passport-twitter/
4)https://www.npmjs.com/package/jsonwebtoken
