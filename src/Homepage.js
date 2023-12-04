import React from "react";
import "./CardEditor.css";
import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const Homepage = (props) => {
  if (!isLoaded(props.homepage)) {
    return <div>Loading...</div>;
  }

  if (props.homepage === null) {
    return <div>No decks available.</div>;
  }

  const decks = Object.keys(props.homepage).map((deckId) => {
    return (
      <div key={deckId}>
        <Link to={`/viewer/${deckId}`}>{props.homepage[deckId].name}</Link>
      </div>
    );
  });

  return (
    <div>
      <h2>Welcome to Jackson's Flashcards app!</h2>
      <Link to="/editor">Create a new deck</Link>
      <h3>Flashcard Decks</h3>
      {decks}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { homepage: state.firebase.data.homepage };
};

export default compose(
  firebaseConnect(["/homepage"]),
  connect(mapStateToProps)
)(Homepage);
