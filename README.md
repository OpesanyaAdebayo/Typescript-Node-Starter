# Typescript-Node-Starter
Simple starter Node.js Application with Typescript

# Pre-requisite
1. You need to have [Node.js](https://nodejs.org/en/) installed.
2. You should also install [VS Code](https://code.visualstudio.com/)

3. Install [MongoDB](https://docs.mongodb.com/manual/installation/)

4. Install [Postman](https://www.getpostman.com/apps)

# Running the application locally
1. Clone this repository

    `git clone https://github.com/OpesanyaAdebayo/Typescript-Node-Starter.git`

2. Install dependencies

    `cd Typescript-Node-Starter`

    `npm install`

3. Create a `.env` file with the same variables as `.env.sample` in this repository. Replace the contents with your own `SESSION_SECRET` and `MLAB_URI`.

    Please note that `MLAB_URI` is the connection url for MongoDB. I used MLAB to manage my MongoDB instance but you can simply replace it with the url you use for your local MongoDB instance.

4. Start your MongoDB server

    `mongod`

5. Build the application

    `npm run build-ts`

6. Start the application

    `npm run start`

7. Endpoints can be accessed on `localhost:4000`.