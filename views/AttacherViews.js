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
    const {parent} = this.props;
    const {ctcInfoStr} = this.state || {};
    return (
      <div>
        Please paste the contract info to attach to:
        <br />
        <textarea spellCheck="false"
          className='ContractInfo'
          onChange={(e) => this.setState({ctcInfoStr: e.currentTarget.value})}
          placeholder='{}'
        />
        <br />
        <button 
          disabled={!ctcInfoStr}
          onClick={() => parent.attach(ctcInfoStr)}
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
    const {wager, lowerLimit, upperLimit,standardUnit, parent} = this.props;
    const {disabled} = this.state || {};
    return (
      <div>
        The terms of the game are:
        <br /> Range: {lowerLimit} - {upperLimit} (limits inclusive)
        <br /> Wager: {wager} {standardUnit}
        <br />
        <button
          disabled={disabled}
          onClick={() => {
            this.setState({disabled: true});
            parent.termsAccepted()
          }}
        >Accept terms and pay wager</button>
      </div>
    );
  }
}

export default AttacherViews;