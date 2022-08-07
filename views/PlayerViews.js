import React from 'react';

const PlayerViews = {};

// Player views must be extended.
// It does not have its own Wrapper view.

PlayerViews.GetGuess = class extends React.Component {
  render() {
    return (
      <div>
        <input type='number'/>
        <button>Submit Guess</button>
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
    return (
      <div>
        Thank you for playing. The outcome of this game was:
        <br />Outcome
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

export default PlayerViews;
