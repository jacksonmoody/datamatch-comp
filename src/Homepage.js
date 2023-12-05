import React from "react";
import "./Homepage.css";
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
      <Link to={`/viewer/${deckId}`} className="deckLink" key={deckId}>
        {props.homepage[deckId].name}
      </Link>
    );
  });

  return (
    <div>
      <header>
        <h2>Welcome to Jackson's Flashcards App!</h2>
        <Link to="/editor">
          <button type="button" className="createButton">
            Create a new deck
          </button>
        </Link>
        <h3 className="flashcardHeader">Flashcard Decks</h3>
      </header>
      <div className="cardList">{decks}</div>
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
