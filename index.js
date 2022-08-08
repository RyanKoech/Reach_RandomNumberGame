import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import {renderDOM, renderView} from './views/Render';
import './index.css';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
import { CHOOSE_ROLE, CONNECT_WALLET , FUND_ACCOUNT, WRAPPER } from './other/Constants';
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
    // this.interval = setInterval(async () => this.updateBalance(), 3000);
  }
  async fundAccount(fundAmount) {
    await reach.fundFromFaucet(this.state.acc, reach.parseCurrency(fundAmount));
    this.setState({view: CHOOSE_ROLE});
  }
  async skipFundAccount() { this.setState({view: CHOOSE_ROLE}); }
  selectAttacher() { this.setState({view: WRAPPER, ContentView: null}); }
  selectDeployer() { this.setState({view: WRAPPER, ContentView: null}); }
  async updateBalance(acc) {
    const balAtomic = await reach.balanceOf(this.state.acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    if(bal != this.state.bal){
      this.setState({bal})
    }
  }
  render() { return renderView(this, AppViews); }
}


renderDOM(<App/>);