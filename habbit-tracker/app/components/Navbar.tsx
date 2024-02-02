'use client';

import {UserTypes} from '../types/types';
interface NavbarProps {
  user: UserTypes | null;
}

const Navbar = (user: NavbarProps) => {
  const handleLogout = async () => {
    window.location.href = '/api/auth/signout';
  };
  return (
    <nav className='navbar'>
      <div className='links'>
        <ul className='list-none flex'>
          <li className='m-5'>
            <a href='/'>Home</a>
          </li>
          <li className='m-5'>
            <a href='/about'>About</a>
          </li>
          {user ? (
            <li className='m-5'>
              <a>Hello, {user?.user?.username}</a>
            </li>
          ) : (
            <li className='m-5' onClick={handleLogout}>
              <a>Log out</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
