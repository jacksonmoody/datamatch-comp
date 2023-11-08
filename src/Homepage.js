import React from "react";
import "./CardEditor.css";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to Jackson's Flashcards app!</h2>
        <Link to="/viewer">Go to card viewer</Link>
        <br /> <br />
        <Link to="/editor">Go to card editor</Link>
      </div>
    );
  }
}

export default Homepage;
