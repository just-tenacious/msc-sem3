import { useState } from "react";
import {
  gql,
  useQuery,
  useMutation
} from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Float!) {
    addProduct(name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

function App() {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !price) return;

    await addProduct({
      variables: {
        name: name.trim(),
        price: Number(price)
      }
    });

    setName("");
    setPrice("");
    refetch();
  };

  return (
    <div className="container">
      <h1>Product Management</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <button type="submit">Add Product</button>
      </form>

      {loading && <h2>Loading products...</h2>}
      {error && <h2>Error: {error.message}</h2>}

      {!loading && !error && (
        <div>
          {data.products.map((product) => (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
