import classes from './Navbar.module.css'

const Navbar = ({balance, standardUnit}) => {
  return (
    <nav>
      <div>Logo</div>
      <ul className={classes.navflex}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <div>
        Balance: {balance} {standardUnit}
      </div>
    </nav>
  )
}

export default Navbar;