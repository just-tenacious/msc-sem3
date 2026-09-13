import React from "react";

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        <div className="welcome-label">
          <span></span>
          WELCOME TO
          <span></span>
        </div>

        <h2>Welcome to React</h2>

        <div className="underline"></div>

        <p className="description">
          This is the main section of our Single Page Application.
          <br />
          It is built with reusable components and modern React features.
        </p>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon react-icon">⚛</div>
            <h3>React</h3>
            <p>
              Build user interfaces with reusable components.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon jsx-icon">JSX</div>
            <h3>JSX</h3>
            <p>
              Write HTML inside JavaScript with JSX syntax.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon component-icon">▱</div>
            <h3>Components</h3>
            <p>
              Break UI into small, independent and reusable pieces.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon spa-icon">ϟ</div>
            <h3>SPA</h3>
            <p>
              Fast, interactive and smooth Single Page Application.
            </p>
          </div>

        </div>
      </main>
    );
  }
}

export default Main;