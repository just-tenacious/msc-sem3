import { gql, useQuery } from "@apollo/client";

const GET_LAUNCHES = gql`
  query {
    launches {
      id
      mission
      rocket
      date
      location
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <h2>Loading space launches...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div className="container">
      <h1>Space Launch Application</h1>

      {data.launches.map((launch) => (
        <div className="card" key={launch.id}>
          <h2>{launch.mission}</h2>
          <p><b>Rocket:</b> {launch.rocket}</p>
          <p><b>Date:</b> {launch.date}</p>
          <p><b>Location:</b> {launch.location}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
