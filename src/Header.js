import React from 'react';
import './Header.css';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
  const [{ basket, user }] = useStateValue();

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <nav className='header'>
      {/* Logo on the left -> img */}
      <Link to='/'>
        <img className='header__logo' src={logo} alt='logo' />
      </Link>
      {/* Search box */}
      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div>
      {/* 3 Links */}
      <div className='header__nav'>
        <Link to={!user && '/login'} className='header__link'>
          <div onClick={login} className='header__option'>
            <span className='header__optionLineOne'>
              Hello {user && user.email}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to='/' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>& Orders</span>
          </div>
        </Link>

        <Link to='/' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Prime</span>
          </div>
        </Link>
      </div>
      {/* Basket icons with number */}
      <Link to='/checkout' className='header__link'>
        <div className='header__optionBasket'>
          {/* shopping basket icon */}
          <ShoppingBasketIcon />
          {/* Number of the items in the basket */}
          <span className='header__optionLineTwo header__basketCount'>
            {basket.length}
          </span>
        </div>
      </Link>
    </nav>
  );
}

export default Header;
