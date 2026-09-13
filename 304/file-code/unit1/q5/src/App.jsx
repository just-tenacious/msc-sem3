import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const boxStyle = {
    padding: "20px",
    margin: "30px auto",
    width: "300px",
    border: "2px solid #0a2540",
    textAlign: "center"
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1 style={{ backgroundColor: "#0a2540", color: "white", padding: "15px" }}>
        Dynamic UI using State
      </h1>

      <div style={boxStyle}>
        <h2>Count: {count}</h2>

        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "8px 15px",
            backgroundColor: "#287bea",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Increase Count
        </button>
      </div>
    </div>
  );
}

export default App;