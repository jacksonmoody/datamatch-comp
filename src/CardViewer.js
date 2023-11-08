import React from "react";
import "./Card.css";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, flipped: false };
  }

  render() {

    return (
      <div>
        <h2>Card Viewer</h2>
        <h3>Card {this.state.index + 1} out of {this.props.cards.length}</h3>
        <hr />
        <div className="card" onClick={() => this.setState({flipped: !this.state.flipped})}>
            <div className="card-text" hidden={this.state.flipped}>{this.props.cards[this.state.index].front}</div>
            <div className="card-text" hidden={!this.state.flipped}>{this.props.cards[this.state.index].back}</div>
        </div>
        <br /> 
        <button disabled = {this.state.index <= 0} onClick={() => this.setState({ index: this.state.index - 1, flipped: false })}> Previous card </button>
        <button disabled = {this.state.index >= this.props.cards.length - 1} onClick={() => this.setState({ index: this.state.index + 1, flipped: false })}> Next card </button>
        <br /> <br />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;
