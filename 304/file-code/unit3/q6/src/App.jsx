import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "./redux/productSlice";

function App() {
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>

      {loading && <h2>Loading products...</h2>}

      {error && <h2>Error: {error}</h2>}

      {!loading && !error && (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;