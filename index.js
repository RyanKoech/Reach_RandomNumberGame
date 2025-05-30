import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/Render';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import { ACCEPT_TERMS, ATTACH, ATTACHING, AWAIT_ATTACHER, AWAIT_RESULTS, AWAIT_TURN, CHOOSE_ROLE, CONNECT_WALLET , DEPLOY, DEPLOYING, DONE, FUND_ACCOUNT, GET_GUESS, GET_SEED, SET_TERMS, TIMEOUT, WRAPPER } from './other/Constants';
const reach = loadStdlib(process.env);


const intToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];
const {standardUnit} = reach;
const defaults = {defaultFundAmt: '10', defaultWager: '3', standardUnit};
const startingBalance = reach.parseCurrency(10);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: CONNECT_WALLET, ...defaults};
  }
  async componentDidMount() {
    // const acc = await reach.getDefaultAccount();
    const acc = await reach.newTestAccount(startingBalance);
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    this.setState({acc, bal});
    if (await reach.canFundFromFaucet()) {
      this.setState({view: FUND_ACCOUNT});
    } else {
      this.setState({view: CHOOSE_ROLE});
    }
    this.interval = setInterval(async () => this.updateBalance(), 3000);
  }
  async fundAccount(fundAmount) {
    await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
    this.setState({view: CHOOSE_ROLE});
  }
  async skipFundAccount() { this.setState({view: CHOOSE_ROLE}); }
  selectAttacher() { this.setState({view: WRAPPER, ContentView: Attacher}); }
  selectDeployer() { this.setState({view: WRAPPER, ContentView: Deployer}); }
  async updateBalance(acc) {
    const balAtomic = await reach.balanceOf(this.state.acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    if(bal != this.state.bal){
      this.setState({bal})
    }
  }
  render() { return renderView(this, AppViews); }
}


class Player extends React.Component {
  random() { return reach.hasRandom.random(); }
  async getSeed() { // Fun([], UInt)
    console.log("This is called");
    const seed = await new Promise(resolveSeedP => {
      this.setState({playable: true, resolveSeedP})
    });
    this.setState({view: AWAIT_TURN});
    return seed;
  }
  async getGuess() { // Fun([], UInt)
    const guess = await new Promise(resolveGuessP => {
      this.setState({view: GET_GUESS, playable: true, resolveGuessP});
    });
    this.setState({view: AWAIT_RESULTS, guess});
    return guess;
  }
  seeOutcome(i, atomicLuckyNumber) {
    this.setState({
      view: DONE, 
      outcome: intToOutcome[i], luckyNumber : reach.bigNumberToNumber(atomicLuckyNumber)
    }); 
  }
  informTimeout() { this.setState({view: TIMEOUT}); }
  playGuess(guess) { this.state.resolveGuessP(guess); }
  provideSeed(seed) { this.state.resolveSeedP(seed); }
  startGame() {this.setState({view: GET_SEED})}
}

class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: SET_TERMS};
  }
  setGameTerms(wager, lowerLimit, upperLimit) { this.setState({view: DEPLOY, wager, lowerLimit, upperLimit}); }
  async deploy() {
    const ctc = this.props.acc.contract(backend);
    this.setState({view: DEPLOYING, ctc});
    this.wager = reach.parseCurrency(this.state.wager); // UInt
    this.deadline = {ETH: 10, ALGO: 100, CFX: 1000}[reach.connector]; // UInt
    this.lowerLimit = (this.state.lowerLimit); // UInt
    this.upperLimit = (this.state.upperLimit); // UInt
    backend.Alice(ctc, this);
    console.log({ctc})
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    console.log({ctcInfoStr})
    this.setState({view: AWAIT_ATTACHER, ctcInfoStr});
  }
  render() { return renderView(this, DeployerViews); }
}

class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: ATTACH};
  }
  attach(ctcInfoStr) {
    const ctc = this.props.acc.contract(backend, JSON.parse(ctcInfoStr));
    this.setState({view: ATTACHING});
    backend.Bob(ctc, this);
  }
  async acceptTerms(wagerAtomic, atomicLowerLimit, atomicUpperLimit) { // Fun([UInt], Null)
    const wager = reach.formatCurrency(wagerAtomic, 4);
    const lowerLimit = reach.bigNumberToNumber(atomicLowerLimit);
    const upperLimit = reach.bigNumberToNumber(atomicUpperLimit);
    return await new Promise(resolveAcceptedP => {
      this.setState({view: ACCEPT_TERMS, wager, lowerLimit, upperLimit, resolveAcceptedP});
    });
  }
  termsAccepted() {
    this.state.resolveAcceptedP();
    this.startGame();
  }
  render() { return renderView(this, AttacherViews); }
}

class TestApp extends React.Component {
  render() {
    const content = <AppViews.FundAccount {...{bal: 12, standardUnit: 'ALGO', defaultFundAmt: 10, parent : this}}/>
    return (
      <AppViews.Wrapper {...{content, bal: 12, standardUnit: 'ALGO'}}/>
    )
  }
}

renderDOM(<TestApp/>);