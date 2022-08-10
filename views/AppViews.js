import React from 'react';
import Navbar from './components/Navbar';

const AppViews = {};

AppViews.Wrapper = class extends React.Component {
  render() {
    const {content, bal, standardUnit} = this.props
    return (
      <div className="App bg-blue">
      <header className="App-header" id="root">
        <Navbar balance={bal} standardUnit={standardUnit}/>
        <h1>Guess the Lucky Number</h1>
        <div>Balance: {bal} {standardUnit}</div>
        {content}
      </header>
    </div>
    )
  }
}

AppViews.ConnectWallet = class extends React.Component {
  render() {
    return (
      <div>
        Please wait while we connect to your account.
        If this takes more than a few seconds, there may be something wrong.
      </div>
    )
  }
}

AppViews.FundAccount = class extends React.Component {
  render() {
    const {bal, standardUnit, defaultFundAmt, parent} = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder= {defaultFundAmt}
          onChange={(e) => {this.setState({amt: e.currentTarget.value})}}
        />
        <button onClick={() => {parent.fundAccount(amt)}}>Fund Account</button>
        <button onClick={() => {parent.skipFundAccount()}}>Skip</button>
      </div>
    );
  }
}

AppViews.ChooseRole = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div>
        Please select a role:
        <br />
        <p>
          <button
            onClick={() => {parent.selectDeployer()}}
          >Deployer</button>
          <br /> Set the wager, deploy the contract.
        </p>
        <p>
          <button
            onClick={() => {parent.selectAttacher()}}
          >Attacher</button>
          <br /> Attach to the Deployer's contract.
        </p>
      </div>
    );
  }
}

export default AppViews;