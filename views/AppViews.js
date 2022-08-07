import React from 'react';
import {WRAPPER, CONNECT_WALLET, FUND_ACCOUNT, CHOOSE_ROLE} from '../other/Constants';

const AppViews = {};

AppViews.WRAPPER = class extends React.Component {
  render() {
    const {content} = this.props
    return (
      <div className="App">
      <header className="App-header" id="root">
        <h1>Guess the Lucky Number</h1>
        {content}
      </header>
    </div>
    )
  }
}

AppViews.CONNECT_WALLET = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
      </div>
    )
  }
}

AppViews.FUND_ACCOUNT = class extends React.Component {
  render() {
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: 0
        <hr />
        Would you like to fund your account with additional ALGO?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder= '10'
          onChange={(e) => {}}
        />
        <button onClick={() => {}}>Fund Account</button>
        <button onClick={() => {}}>Skip</button>
      </div>
    );
  }
}

AppViews.CHOOSE_ROLE = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        Please select a role:
        <br />
        <p>
          <button
            onClick={() => {}}
          >Deployer</button>
          <br /> Set the wager, deploy the contract.
        </p>
        <p>
          <button
            onClick={() => {}}
          >Attacher</button>
          <br /> Attach to the Deployer's contract.
        </p>
      </div>
    );
  }
}

export default AppViews;