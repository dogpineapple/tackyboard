# tackyboard
A universal card-based task managing web application.
Demo: https://tackyboard.diana-liang.com/
Hosted using Netlify and Heroku

# the stack
Front-end: JavaScript 
> Front-end libraries: React.js, axios, fortawesome

Back-end: Python, PostgreSQL
> Back-end libraries: Flask, SQLAlchemy, JWT authentication, Bcrypt

# tackyboard functions
- Authentication: Login, Sign-up user
  - JWT is securely saved as a cookie in the client
- Create/Delete a Tackyboard (taskboard)
- Create/Delete/Edit a Task
- Create/Delete a Tackynote (a Task's note)

# future updates
- Patch task status
- Edit task name

# tackyboard motive
Tackyboard was made after an attempt at using Trello's task board for tracking job applications but, eventually felt overwhelmed by the number of features available.
In Tackyboard's version, it is simplified as much as possible while keeping the qualities of a universal task board.

# installation:
To install, clone the repo and you should have two folders, `tackyboard-frontend` and `tackyboard-backend`.

We'll start with the backend first.
Go into `tackyboard-backend` and we'll start off by making a python virtual environment.
1. Run `python3 -m venv venv`. This makes the virtual enviornment (venv).
2. Then run `source venv/bin/activate`. This should activate the venv.
3. Now we need to install all the requirements with `pip install -r requirements.txt`
4. Once the previous steps are complete, run `flask run` to start the backend.

Now for the frontend.
Go into `tackyboard-frontend` and run `npm install` and then when that's done and has no problems, run `npm start` while the backend is running
