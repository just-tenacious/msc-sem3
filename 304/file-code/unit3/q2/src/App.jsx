import { useSelector, useDispatch } from "react-redux";
import { addFood, removeFood } from "./redux/foodSlice";

function App() {
  const foodItems = useSelector((state) => state.food.items);
  const dispatch = useDispatch();

  const handleAddFood = () => {
    const newFood = {
      id: Date.now(),
      name: "Sandwich",
      category: "Snacks",
      price: 120
    };

    dispatch(addFood(newFood));
  };

  return (
    <div>
      <h1>Food Items List</h1>

      <button onClick={handleAddFood}>
        Add Food
      </button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {foodItems.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>₹{food.price}</td>
              <td>
                <button
                  onClick={() => dispatch(removeFood(food.id))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;