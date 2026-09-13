import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const students = [
  { id: "1", name: "Aarav", course: "M.Sc. Computer Science", semester: 3 },
  { id: "2", name: "Diya", course: "M.Sc. Computer Applications", semester: 3 },
  { id: "3", name: "Rohan", course: "B.Sc. Computer Science", semester: 5 },
  { id: "4", name: "Meera", course: "BCA", semester: 4 }
];

const schema = buildSchema(`
  type Student {
    id: ID!
    name: String!
    course: String!
    semester: Int!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
  }
`);

const root = {
  students: () => students,
  student: ({ id }) => students.find((student) => student.id === id)
};

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4002, () => {
  console.log("Q2 GraphQL server running at http://localhost:4002/graphql");
  console.log("Open the URL in a browser to use GraphiQL.");
});
