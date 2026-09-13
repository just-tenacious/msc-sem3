import { useState } from "react";
import Child from "./Child";

function Parent() {
  const [age, setAge] = useState(24);

  return (
    <div className="parent-card">
      <h2>Parent Component</h2>

      <Child name="Shraddha" age={age} />

      <button onClick={() => setAge(age + 1)}>
        Increase Age
      </button>
    </div>
  );
}

export default Parent;