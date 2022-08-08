import React from 'react';

const PlayerViews = {};

// Player views must be extended.
// It does not have its own Wrapper view.

PlayerViews.GetGuess = class extends React.Component {
  render() {
    const {parent, playable} = this.props;
    const guess = (this.state || {}).guess || 10
    return (
      <div>
        <input type='number' onChange={(e) => {this.setState({guess: e.currentTarget.value})}}/>
        <button
          disabled={!playable}
          onClick={() => parent.playGuess(guess)}
        >Submit Guess</button>
      </div>
    );
  }
}

PlayerViews.GetSeed = class extends React.Component {
  render() {
    const {parent, playable} = this.props
    const seed = (this.state || {}).seed || 10
    return (
      <div>
        <input type='number' onChange={e => {this.setState({seed : e.currentTarget.value})}}/>
        <button
          disabled={!playable}
          onClick={() => {parent.provideSeed(seed);}}
        >Submit Seed</button>
      </div>
    );
  }
}

PlayerViews.AwaitResults = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for results...
      </div>
    );
  }
}

PlayerViews.Done = class extends React.Component {
  render() {
    const {outcome, luckyNumber} = this.props;
    return (
      <div>
        Thank you for playing. The outcome of this game was:
        <br />{outcome || 'Unknown'}
        <br/> The luckyNumber was {luckyNumber}
      </div>
    );
  }
}

PlayerViews.Timeout = class extends React.Component {
  render() {
    return (
      <div>
        There's been a timeout. (Someone took too long.)
      </div>
    );
  }
}

PlayerViews.AwaitTurn = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for the other player...
      </div>
    );
  }
}

export default PlayerViews;
