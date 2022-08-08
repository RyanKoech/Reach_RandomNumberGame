import React from 'react';
import PlayerViews from './PlayerViews';

const DeployerViews = {...PlayerViews};

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
    return (
      <div>
        <input
          type='number'
          placeholder={'3'}
          onChange={(e) => {}}
        /> ALGO
        <br />
        <label>Lower Range Limit : </label>
        <input
          type='number'
          placeholder={'0'}
          onChange={(e) => {}}
        />
        <br />
        <label>Upper Range Limit : </label>
        <input
          type='number'
          placeholder={'10'}
          onChange={(e) => {}}
        />
        <br />
        <button
          onClick={() => {}}
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
        Wager (pay to deploy): <strong> 30 </strong> ALGO
        <br />
        <button
          onClick={() => {}}
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

DeployerViews.WaitingForAttacher = class extends React.Component {

  render() {
    const {ctcInfoStr} = this.props;
    return (
      <div>
        Waiting for Attacher to join...
        <br /> Please give them this contract info:
        <pre className='ContractInfo'>
          Contract info
        </pre>
        <button
          onClick={(e) => {}}
        >Copy to clipboard</button>
      </div>
    )
  }
}

export default DeployerViews;
