import React from "react";
import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import "./CardViewer.css";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, flipped: false };
  }

  render() {
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>;
    }

    return (
      <>
        <header>
          <h2>{this.props.name}</h2>
          <h3>
            Card {this.state.index + 1} out of {this.props.cards.length}
          </h3>
        </header>
        <div className="body">
          <div
            className="card"
            onClick={() => this.setState({ flipped: !this.state.flipped })}
          >
            <div className="card-text" hidden={this.state.flipped}>
              {this.props.cards[this.state.index].front}
            </div>
            <div className="card-text" hidden={!this.state.flipped}>
              {this.props.cards[this.state.index].back}
            </div>
          </div>
          <div className="buttonRow">
            <button
              disabled={this.state.index <= 0}
              onClick={() =>
                this.setState({ index: this.state.index - 1, flipped: false })
              }
            >
              {"< Previous Card"}
            </button>
            <button
              disabled={this.state.index >= this.props.cards.length - 1}
              onClick={() =>
                this.setState({ index: this.state.index + 1, flipped: false })
              }
            >
              {"Next Card >"}
            </button>
          </div>
          <Link to="/">
            <button className="grey">{"Return Home"}</button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return { cards: cards, name: name };
};

export default compose(
  withRouter,
  firebaseConnect((props) => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps)
)(CardViewer);
