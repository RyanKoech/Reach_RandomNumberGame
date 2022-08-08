import React from 'react';
import PlayerViews from './PlayerViews';

const AttacherViews = {...PlayerViews};

AttacherViews.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Attacher">
        <h2>Attacher (Bob)</h2>
        {content}
      </div>
    );
  }
}

AttacherViews.Attach = class extends React.Component {
  render() {
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea spellCheck="false"
          className='ContractInfo'
          onChange={(e) => {}}
          placeholder='{}'
        />
        <br />
        <button
          disabled={''}
          onClick={() => {}}
        >Attach</button>
      </div>
    );
  }
}

AttacherViews.Attaching = class extends React.Component {
  render() {
    return (
      <div>
        Attaching, please wait...
      </div>
    );
  }
}

AttacherViews.AcceptTerms = class extends React.Component {
  render() {
    return (
      <div>
        The terms of the game are:
        <br /> Range: 10 - 30 (limits inclusive)
        <br /> Wager: 30 ALGO
        <br />
        <button
          disabled={disabled}
          onClick={() => {}}
        >Accept terms and pay wager</button>
      </div>
    );
  }
}

AttacherViews.WaitingForTurn = class extends React.Component {
  render() {
    return (
      <div>
        Waiting for the other player...
      </div>
    );
  }
}

export default AttacherViews;