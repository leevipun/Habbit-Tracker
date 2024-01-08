'use client';

const Navbar = () => {
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
          <li className='m-5'>
            <a href='/login'>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
