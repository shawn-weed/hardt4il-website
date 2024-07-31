import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsYoutube, BsTiktok } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import logo from '../assets/Hardtail text logo.png';
import logoWhite from '../assets/Hardtail logo white.png';

export default function FooterCom() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <Footer container className='border border-t-2 border-fuchsia-500 dark:!bg-[#1d1d1d]'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-evenly sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap text-lg 
                    sm:text-xl font-semibold dark:text-white'>
                        <span>
                        {theme === 'light' ? <img src={logo} className='h-12 border border-fuchsia-500 rounded-lg' /> :
                        <img src={logoWhite} className='h-12 border border-fuchsia-500 rounded-lg' />}
                        </span>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3
                sm:gap-6'>
                  <div>
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                            href='/about-me'
                            target='_blank'
                            rel='noopner noreferrer'>
                            About Me
                        </Footer.Link>
                        <Footer.Link 
                            href='/about'
                            target='_blank'
                            rel='noopener noreferrer'>
                            About Hardt4il
                        </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div className=''>
                    <Footer.Title title='Follow Us' />
                    <Footer.LinkGroup className=' self-center justify-evenly'>
                        <div className='col-auto space-y-4'>
                            <Footer.Icon href='https://www.facebook.com/profile.php?id=61561248860591' 
                            icon={BsFacebook} 
                            target='_blank'
                            rel='noopener noreferrer'
                            />
                            <Footer.Icon href='https://www.instagram.com/hardt4il' 
                            icon={BsInstagram} 
                            target='_blank'
                            rel='noopener noreferrer'
                            />
                        </div>
                        <div className='mr-10 col-auto space-y-4'>
                            <Footer.Icon href='https://youtube.com/@hardt4il' 
                            icon={BsYoutube} 
                            target='_blank'
                            rel='noopener noreferrer'
                            />
                            <Footer.Icon href='https://www.tiktok.com/@hardt4il_mtb' 
                            icon={BsTiktok} 
                            target='_blank'
                            rel='noopener noreferrer'
                            />
                        </div>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title='Legal' />
                    <Footer.LinkGroup col>
                        <Footer.Link 
                            href='#'
                        >
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link 
                            href='#'
                        >
                            Terms & Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
            </div>
            <Footer.Divider />
            <div className=''>
                <Footer.Copyright 
                  href='#' 
                  by="Hardt4il" 
                  year={new Date().getFullYear() } 
                />
            </div>
        </div>
    </Footer>
  )
}
