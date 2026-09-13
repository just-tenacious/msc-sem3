import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

let products = [
  { id: "1", name: "Laptop", price: 55000 },
  { id: "2", name: "Smartphone", price: 25000 },
  { id: "3", name: "Headphones", price: 3000 }
];

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
  }
`);

const root = {
  products: () => products,

  addProduct: ({ name, price }) => {
    const product = {
      id: String(Date.now()),
      name,
      price
    };

    products.push(product);
    return product;
  }
};

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4005, () => {
  console.log("Q5 GraphQL API: http://localhost:4005/graphql");
});
