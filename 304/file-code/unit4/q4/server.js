import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const launches = [
  {
    id: "1",
    mission: "Artemis I",
    rocket: "SLS",
    date: "2026-10-01",
    location: "Kennedy Space Center"
  },
  {
    id: "2",
    mission: "Starlink Mission",
    rocket: "Falcon 9",
    date: "2026-10-15",
    location: "Cape Canaveral"
  },
  {
    id: "3",
    mission: "Earth Observation",
    rocket: "Ariane 6",
    date: "2026-11-05",
    location: "Guiana Space Centre"
  }
];

const schema = buildSchema(`
  type Launch {
    id: ID!
    mission: String!
    rocket: String!
    date: String!
    location: String!
  }

  type Query {
    launches: [Launch!]!
  }
`);

const root = {
  launches: () => launches
};

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4004, () => {
  console.log("Q4 GraphQL API: http://localhost:4004/graphql");
});