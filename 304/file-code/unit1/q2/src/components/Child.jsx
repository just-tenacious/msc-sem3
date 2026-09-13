function Child({ name, age }) {
  return (
    <div className="child-card">
      <h3>Child Component</h3>

      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default Child;