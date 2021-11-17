# Oauth-And-JWT

<b>To run this experiment:</b><br/> 

Step 1) Clone this repository and navigate to folder. <br/> <br/> 
Step 2) Run npm install to download all packages. <br/> <br/> 
Step 3) Create a database 'itl'. <br/> <br/> 
Step 4) Create a table 'users' inside the 'itl' database with fields 'email' (primary key) and 'password'. <br/> <br/> 
Step 5) Now go to Google Developers Console website and create new OAuth 2.0 Client and generate GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET. <br/> <br/>
Step 6) Now go to Facebook Developers website and create new application and generate FACEBOOK_APP_ID, FACEBOOK_APP_SECRET. <br/> <br/>
Step 7) Now go to Twitter Application Management website and create new application and generate TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET. <br/> <br/>
Step 7) Create .env file and add all above keys and secrets and mysql database password in it. <br/> <br/>
Step 8) Run code using node app.js. <br/> 

<b>References:</b><br/> 
1) https://www.passportjs.org/packages/passport-google-oauth20/ <br/> 
2) https://www.passportjs.org/packages/passport-facebook/ <br/> 
3) https://www.passportjs.org/packages/passport-twitter/ <br/> 
4) https://www.npmjs.com/package/jsonwebtoken <br/> 
