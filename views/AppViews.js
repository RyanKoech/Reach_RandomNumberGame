import React from 'react';
import Navbar from './components/Navbar';
// import UilReact from '@iconscout/react-unicons/icons/uil-react'

const AppViews = {};

AppViews.Wrapper = class extends React.Component {
  render() {
    const {content, bal, standardUnit} = this.props
    return (
    <div className='body'>
      <header className="App-header" id="root">
        <Navbar balance={bal} standardUnit={standardUnit}/>
        <div className='nav'>
        <h1 className='h1 nav__logo'>Guess The Lucky Number</h1>
        <div className="h1">Balance: {bal} {standardUnit}</div>
        </div>
        {content}
      </header>
    </div>
    )
  }
}

AppViews.ConnectWallet = class extends React.Component {
  render() {
    return (
      <div className="body">
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
        {/* <h2>Fund account</h2> */}
        <br />
        <div className="balance__title">
        <p className='h1'>Your balance is</p>
        <h3 className="balance__title">{bal} {standardUnit}</h3>
        </div>
        {/* <hr /> */}
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder= {defaultFundAmt}
          onChange={(e) => {this.setState({amt: e.currentTarget.value})}}
        />
        <button className='button' onClick={() => {parent.fundAccount(amt)}}>Fund Account</button>
        <button className='button' onClick={() => {parent.skipFundAccount()}}>Skip</button>
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