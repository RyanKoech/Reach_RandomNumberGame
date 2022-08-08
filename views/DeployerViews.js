import React from 'react';
import PlayerViews from './PlayerViews';

const DeployerViews = {...PlayerViews};

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

DeployerViews.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Deployer">
        <h2>Deployer (Alice)</h2>
        {content}
      </div>
    );
  }
}

DeployerViews.SetGameTerms = class extends React.Component {
  render() {
    const {parent, defaultWager, standardUnit} = this.props;
    const wager = (this.state || {}).wager || defaultWager;
    const lowerLimit = (this.state || {}).lowerLimit || 10;
    const upperLimit = (this.state || {}).upperLimit || 20;
    return (
      <div>
        <label>Wager : </label>
        <input
          type='number'
          placeholder={wager}
          onChange={(e) => {this.setState({wager: e.currentTarget.value})}}
        /> ALGO
        <br />
        <label>Lower Range Limit : </label>
        <input
          type='number'
          placeholder={lowerLimit}
          onChange={(e) => {this.setState({lowerLimit: e.currentTarget.value})}}
        />
        <br />
        <label>Upper Range Limit : </label>
        <input
          type='number'
          placeholder={upperLimit}
          onChange={(e) => {this.setState({upperLimit: e.currentTarget.value})}}
        />
        <br />
        <button
          onClick={() => {parent.setGameTerms(wager, lowerLimit, upperLimit)}}
        >Set Game Terms</button>
      </div>
    );
  }
}

DeployerViews.Deploy = class extends React.Component {
  render() {
    const {parent, wager, standardUnit} = this.props;
    return (
      <div>
        Wager (pay to deploy): <strong> {wager} </strong> {standardUnit}
        <br />
        <button
          onClick={() => {parent.deploy()}}
        >Deploy</button>
      </div>
    );
  }
}

DeployerViews.Deploying = class extends React.Component {
  render() {
    return (
      <div>Deploying... please wait.</div>
    );
  }
}

DeployerViews.AwaitingAttacher = class extends React.Component {
  async copyToClipboard(button) {
    const {ctcInfoStr} = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }

  render() {
    const {ctcInfoStr, parent} = this.props;
    return (
      <div>
        Waiting for Attacher to join...
        <br /> Please give them this contract info:
        <pre>
        {ctcInfoStr}
        </pre>
        <button
          onClick={(e) => {this.copyToClipboard(e.currentTarget)}}
        >Copy to clipboard</button>
        <button
          onClick={(e) => {parent.startGame();}}
        >Start Game</button>
      </div>
    )
  }
}

export default DeployerViews;
