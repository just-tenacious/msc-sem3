import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const books = [
  { id: "1", title: "The Alchemist", author: "Paulo Coelho", price: 399 },
  { id: "2", title: "Atomic Habits", author: "James Clear", price: 499 },
  { id: "3", title: "Clean Code", author: "Robert C. Martin", price: 699 },
  { id: "4", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 450 }
];

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    price: Float!
  }

  type Query {
    books: [Book!]!
  }
`);

const root = {
  books: () => books
};

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4001, () => {
  console.log("Q1 GraphQL server running at http://localhost:4001/graphql");
  console.log("Open the URL in a browser to use GraphiQL.");
});
