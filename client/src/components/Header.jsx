import { Avatar, Button, Dropdown, Navbar, TextInput, } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { linkTheme } from '../themes/linkTheme';
import { inputTheme } from '../themes/textInputTheme';
 
export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const logo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20text%20logo.png?alt=media&token=297704a5-b292-4267-a3b2-1a35b119f80e'
    const whiteLogo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20logo%20white.png?alt=media&token=41d56f13-ff89-49fe-87b3-ef176fc965bb'



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
    <Navbar className='border-b-2 dark:border-gray-500'>
        <Link to="/" className=''>
          <span className=''>
            {theme === 'light' ? <img src={logo} className='h-12 border border-fuchsia-500 rounded-lg' /> :
            <img src={whiteLogo} className='h-12 border border-fuchsia-500 rounded-lg' />}
          </span>
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput 
              theme={inputTheme}
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
            <Button className='w-12 h-10 inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
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
                <Button gradientDuoTone='purpleToPink' outline>
                  Sign In
                </Button>
              </Link>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse className=''> 
            <Navbar.Link theme={linkTheme} active={path === "/"} as={'div'}>
                <Link className='flex justify-center' to='/'>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link theme={linkTheme} active={path === "/about"} as={'div'}>
                <Link className=' flex justify-center' to='/about'>
                    About
                </Link>
            </Navbar.Link>
            <Navbar.Link theme={linkTheme} active={path === "/media"} as={'div'}>
                <Link className='flex justify-center' to='/media'>
                    Media
                </Link>
            </Navbar.Link>
            <Navbar.Link theme={linkTheme} active={path === "/search"} as={'div'}>
                <Link className='hidden lg:flex justify-center' to='/search'>
                    Search
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>    
    </Navbar>
  )
}
