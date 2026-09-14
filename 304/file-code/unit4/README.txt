304 UNIT 4 - READY-MADE PRACTICALS
==================================

This folder contains q1 to q8. Each practical is self-contained.

GENERAL RULE
------------
Open PowerShell in the required q folder, run:

    npm install

Then use the command listed below.

Q1 - GraphQL API using Express
-------------------------------
cd q1
npm install
npm start

Open:
http://localhost:4001/graphql

Use GraphiQL with:

query {
  books {
    id
    title
    author
    price
  }
}

Q2 - GraphiQL Student Queries
-----------------------------
cd q2
npm install
npm start

Open:
http://localhost:4002/graphql

All students:

query {
  students {
    id
    name
    course
    semester
  }
}

One student:

query {
  student(id: "1") {
    name
    course
  }
}

Q3 - Product GraphQL Queries and Mutations
------------------------------------------
cd q3
npm install
npm start

Open:
http://localhost:4003/graphql

Get products:

query {
  products {
    id
    name
    price
  }
}

Add product:

mutation {
  addProduct(name: "Monitor", price: 12000) {
    id
    name
    price
  }
}

Update product:

mutation {
  updateProduct(id: "1", price: 60000) {
    id
    name
    price
  }
}

Delete product:

mutation {
  deleteProduct(id: "2")
}

Q4 - Apollo Client Space Launch
-------------------------------
cd q4
npm install
npm run server
npm run dev

Open the Vite URL shown in the terminal, normally:
http://localhost:5173

The same project starts its GraphQL API automatically on port 4004.

Q5 - React + Apollo Product Management
---------------------------------------
cd q5
npm install
npm run server
npm run dev

Open the Vite URL shown in the terminal, normally:
http://localhost:5173

The same project starts its GraphQL API automatically on port 4005.

Q6 - Jest Redux Reducer Testing
-------------------------------
cd q6
npm install
npm test

Expected: 4 passing tests.

Q7 - Jest Component and Snapshot Testing
----------------------------------------
cd q7
npm install
npm test

Expected: component tests and snapshot test passing.
A __snapshots__ folder will be generated automatically by Jest.

Q8 - Docker + Nginx React Deployment
-------------------------------------
Docker Desktop must be installed and running.

cd q8
npm install
npm run build

Then:

docker build -t react-app .
docker run -p 8080:80 react-app

Open:
http://localhost:8080

To stop the container:
docker ps
docker stop <container_id>

IMPORTANT
---------
Q4 and Q5 use concurrently so one command starts both the GraphQL
server and React/Vite development server.

Q1-Q3 use express-graphql with GraphiQL enabled.

Q6-Q7 use Jest and are run with npm test.

Q8 uses a multi-stage Docker build:
React source -> npm run build -> Nginx -> Docker image -> container.
