# CSC372---Term-Project-
This Term project is an employee timesheet log. It keeps track of when an employee clocks in/ clocks out. from work. It may or may not require login/logout functionality, but may use an external api for that, like google for example.


### Setup Instructions (FOR LOCALHOST)
1. download the repo as a ZIP file.
2. extract the zip file.
3. Launch VS Code and go to File/Open Folder/Location of the repo folder
4. on the root of the repo, open a terminal by presssing right click/open in integrated terminal
5. make sure you have your .env file setup in order for the project to work. (neon)
6. type node --watch server.js
7. click on the timesheet-project folder, and right click/open in integrated terminal
8. Run these two commands: npm install && npm run dev.
9. The server should run with http://localhost:5173
10. Thats it! enjot the timsheet!


### Reflection and WriteUp
My Design Choices: I decided to for the app's design to be fairly basic, but 
still intuitive to use, with some amounts of styling around. I Chose React as my
front end, as i felt it was the best for me to understand. My backened structure
works with node express, with routes, controllers, models, a database js file, 
the main server.js file. I did not make a database schema, but i framed the app
to where the users table would hold the IDs of users, the entries table would 
hold the timesheet of the user, the day they logged it, date and time. The 
session table was for authentication, to remember the user was logged in. Some 
challenges i faced was user login logout functionality as i originally opted for
google oAuth but i felt it was too challenging so i took a different approach 
with cookies. I tried solving this conflict with it working with render, which 
it unfortunately did not. What i learned from this full stack development is that
it takes time, there will always be some debugging, and patience as well. I'm 
glad i was able to learn front end and back end development with express node 
and JS, as i previously had little experience with it. For the future, i would 
hope to replace the cookie based user authentication with proper google sign-in 
authentication, once i could figure out the bells and whistles of actually 
applying it. 
- thank you, 
- Allen


### MVP DEMO Video Link!
https://uncg-my.sharepoint.com/:v:/g/personal/aeorozcolop_uncg_edu/IQBYaYmj9REZSYiZlnqLMcLfASheMRzz9fiTa_azeGeHYtA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=DSbh6i

### My RENDER link(wont currently work but it is deployed, changes made so localhost works again.)
https://csc372-term-project-employee-timesheet-2tai.onrender.com/

