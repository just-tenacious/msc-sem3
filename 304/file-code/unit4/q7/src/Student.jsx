function Student({ name, course, semester }) {
  return (
    <div>
      <h2>Student Information</h2>
      <p>Name: {name}</p>
      <p>Course: {course}</p>
      <p>Semester: {semester}</p>
    </div>
  );
}

export default Student;
