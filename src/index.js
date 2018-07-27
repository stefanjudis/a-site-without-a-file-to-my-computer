import React from "react";
import ReactDOM from "react-dom";
import { createClient } from "contentful";
import "./styles.css";

const client = createClient({
  space: "oepx6krtjt9h",
  accessToken:
    "4a60e5da79541c5b27f416aaff2673348e2d883a38cf763309b29505e3b53ef7"
});

function Portfolio({ greeting, biography, image }) {
  return (
    <div className="Portfolio">
      <img className="Portfolio__Image" src={image.fields.file.url} />
      <h1>{greeting}</h1>
      <p>{biography}</p>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, portfolio: null };

    client
      .getEntries({
        content_type: "portfolio"
      })
      .then(({ items }) => {
        this.setState({ isLoading: false, portfolio: items[0] });
      });
  }

  render() {
    return this.state.isLoading ? (
      <div>Loading</div>
    ) : (
      <div className="App">
        <Portfolio {...this.state.portfolio.fields} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
