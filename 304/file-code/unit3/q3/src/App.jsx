import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchFoodRequest,
  fetchFoodSuccess,
  fetchFoodFailure
} from "./redux/foodSlice";

function App() {
  const { items, loading, error } = useSelector(
    (state) => state.food
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodRequest());

    const fetchFood = setTimeout(() => {
      const foodData = [
        {
          id: 1,
          name: "Pizza",
          category: "Fast Food",
          price: 250
        },
        {
          id: 2,
          name: "Burger",
          category: "Fast Food",
          price: 150
        },
        {
          id: 3,
          name: "Pasta",
          category: "Italian",
          price: 200
        },
        {
          id: 4,
          name: "Sandwich",
          category: "Snacks",
          price: 120
        }
      ];

      dispatch(fetchFoodSuccess(foodData));
    }, 2000);

    return () => clearTimeout(fetchFood);
  }, [dispatch]);

  return (
    <div>
      <h1>Food Items</h1>

      {loading && <h2>Loading food items...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {items.map((food) => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>₹{food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;