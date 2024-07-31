import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import logo from '../assets/Hardtail text logo.png';
import logoWhite from '../assets/Hardtail logo white.png';

 
export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm);

    useEffect (() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message)
      }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

  return (
    <Navbar className='border-b-2 dark:!bg-[#2d2d2d]'>
        <Link to="/" className='self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold dark:text-white'>
          <span className=''>
            {theme === 'light' ? <img src={logo} className='h-12 border border-fuchsia-500 rounded-lg' /> :
            <img src={logoWhite} className='h-12 border border-fuchsia-500 rounded-lg' />}
          </span>
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput 
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Link to='./search'>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
              <AiOutlineSearch />
          </Button>
        </Link>  
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            {currentUser ? (
                <Dropdown 
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                  </Link>
                </Dropdown>
            ):(
              <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Sign In
                </Button>
              </Link>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse> 
            <Navbar.Link active={path === "/"} as={'div'}>
                <Link to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/media"} as={'div'}>
                <Link to='/media'>
                    Media
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>    
    </Navbar>
  )
}
