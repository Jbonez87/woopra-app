This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To start this project you will need:
1. [MongoDb](https://www.mongodb.com/)
If using a mac, download [Homebrew](https://brew.sh/) and then run
* `brew install mongodb` in your terminal.
additional instructions for setting up your database files [here](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

In your terminal on mac or windows, run the command
* `mongod`

Then open a second terminal tab or window and run
* `mongo`

Finally, create a jsonplaceholder database in the second window or tab by running this command:
* `use jsonplaceholder`

2. You need to have [node](https://treehouse.github.io/installation-guides/mac/node-mac.html) installed on your machine and then run this command
* `npm i `
to install this project's packages

3. Run the following command to seed the data into your database:

* `npm run store`

4. To start the backend server, run:

* `npm run dev`

5. To start the React frontend, run:

* `npm run start`
