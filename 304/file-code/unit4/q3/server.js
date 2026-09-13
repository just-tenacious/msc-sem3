import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

let products = [
  { id: "1", name: "Laptop", price: 55000 },
  { id: "2", name: "Smartphone", price: 25000 },
  { id: "3", name: "Headphones", price: 3000 },
  { id: "4", name: "Keyboard", price: 1500 }
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
    updateProduct(id: ID!, name: String, price: Float): Product
    deleteProduct(id: ID!): Boolean
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
  },

  updateProduct: ({ id, name, price }) => {
    const product = products.find((item) => item.id === id);
    if (!product) return null;

    if (name !== undefined && name !== null) product.name = name;
    if (price !== undefined && price !== null) product.price = price;

    return product;
  },

  deleteProduct: ({ id }) => {
    const oldLength = products.length;
    products = products.filter((product) => product.id !== id);
    return products.length < oldLength;
  }
};

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4003, () => {
  console.log("Q3 GraphQL server running at http://localhost:4003/graphql");
  console.log("Open the URL in a browser to use GraphiQL.");
});
