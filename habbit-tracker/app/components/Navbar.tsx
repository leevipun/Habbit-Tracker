'use client';

import {UserTypes} from '../types/types';
interface NavbarProps {
  user: UserTypes | null;
}

const Navbar = (user: NavbarProps) => {
  const handleLogout = async () => {
    window.location.href = '/api/auth/signout';
  };

  const handleRedirectUserPage = () => {
    window.location.href = `/user/${user?.user?._id}`;
  };

  return (
    <nav className='navbar'>
      <div className='links text-[#E0F4F5]'>
        <ul className='list-none flex'>
          <li className='m-5'>
            <a href='/'>Home</a>
          </li>
          <li className='m-5'>
            <a href='/about'>About</a>
          </li>
          {user ? (
            <>
              <li
                className='m-5 cursor-pointer'
                onClick={handleRedirectUserPage}
              >
                <a>Hello, {user?.user?.username}</a>
              </li>
              <li className='m-5 cursor-pointer' onClick={handleLogout}>
                <a>Log out</a>
              </li>
            </>
          ) : (
            <li className='m-5'>
              <a href='/api/auth/signin'>Log in</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
