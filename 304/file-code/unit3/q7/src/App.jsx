import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { searchProducts } from "./redux/searchSlice";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { products, loading, error } = useSelector(
    (state) => state.search
  );

  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm));
    }
  };

  return (
    <div>
      <h1>Product Search</h1>

      <input
        type="text"
        placeholder="Enter product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <h2>Searching products...</h2>}

      {error && <h2>Error: {error}</h2>}

      {!loading && !error && products.length > 0 && (
        <div>
          <h2>Search Results</h2>

          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {!loading &&
        !error &&
        searchTerm !== "" &&
        products.length === 0 && (
          <h2>No products found</h2>
        )}
    </div>
  );
}

export default App;