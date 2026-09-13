import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchProducts,
  addToCart,
  removeFromCart
} from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();

  const {
    products,
    cart,
    loading,
    error
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="container">
      <h1>Product List and Shopping Cart</h1>

      {/* Loading */}
      {loading && <h2>Loading products...</h2>}

      {/* Error */}
      {error && <h2>Error: {error}</h2>}

      {/* Products */}
      {!loading && !error && (
        <>
          <h2>Products</h2>

          <div className="products">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>Price: ₹{product.price}</p>

                <button
                  onClick={() =>
                    dispatch(addToCart(product))
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Cart */}
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <div className="cart">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span>
                    {item.name} - ₹{item.price}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h3>Total: ₹{totalPrice}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;