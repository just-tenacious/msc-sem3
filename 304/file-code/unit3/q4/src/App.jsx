import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFailure
} from "./redux/newsSlice";

function App() {
  const { articles, loading, error } = useSelector(
    (state) => state.news
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsRequest());

    const newsPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const newsData = [
          {
            id: 1,
            title: "React and Redux",
            description:
              "Learn how React and Redux are used together to manage application state."
          },
          {
            id: 2,
            title: "JavaScript Updates",
            description:
              "Explore the latest features and improvements in modern JavaScript."
          },
          {
            id: 3,
            title: "Web Development",
            description:
              "Discover new trends and technologies in modern web development."
          },
          {
            id: 4,
            title: "Frontend Technologies",
            description:
              "Learn about popular tools and frameworks used to build web applications."
          }
        ];

        const success = true;

        if (success) {
          resolve(newsData);
        } else {
          reject(new Error("Failed to fetch news"));
        }
      }, 2000);
    });

    newsPromise
      .then((data) => {
        dispatch(fetchNewsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchNewsFailure(error.message));
      });
  }, [dispatch]);

  return (
    <div>
      <h1>News Application</h1>

      {loading && <h2>Loading news...</h2>}

      {error && <h2>Error: {error}</h2>}

      {!loading && !error && (
        <div>
          {articles.map((article) => (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;