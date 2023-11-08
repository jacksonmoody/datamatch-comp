import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import Homepage from "./Homepage";
import { Route, Routes } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: "front1", back: "back1" },
        { front: "front2", back: "back2" },
      ],
    };
  }

  addCard = (card) => {
    if (card.front.trim() === "" || card.back.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = (index) => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  render() {
    return (
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/editor"
          element={
            <CardEditor
              addCard={this.addCard}
              cards={this.state.cards}
              deleteCard={this.deleteCard}
            />
          }
        ></Route>
        <Route
          path="/viewer"
          element={<CardViewer cards={this.state.cards} />}
        ></Route>
      </Routes>
    );
  }
}

export default App;
