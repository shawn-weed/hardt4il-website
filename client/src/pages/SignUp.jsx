import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useSelector } from 'react-redux';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const logo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20text%20logo.png?alt=media&token=297704a5-b292-4267-a3b2-1a35b119f80e'
  const whiteLogo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20logo%20white.png?alt=media&token=41d56f13-ff89-49fe-87b3-ef176fc965bb'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.');
    } else if (formData.password !== formData.confirmPassword) {
      return setErrorMessage('Passwords do not match')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const { confirmPassword, ...rest } = formData; 
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false)
        return setErrorMessage(data.message)

      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col 
      md:flex-row md:items-center gap-5'>
        {/*left side*/}
        <div className = "flex-1">
        <Link to="/" className=''>
          <span className=''>
            {theme === 'light' ? <img src={logo} className='h-30' /> :
            <img src={whiteLogo} className='h-30' />}
          </span>
        </Link>
          <p className='text-sm mt-5'>
            Sign up for the best content in Mountain Biking
          </p>
        </div>
        {/*right side*/}
        <div className = "flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' 
              onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' 
              onChange={handleChange}/>
            </div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' 
              onChange={handleChange}/>
              <Label value='Confirm password' />
              <TextInput type='password' placeholder='Confirm Password' id='confirmPassword' 
              onChange={handleChange}/>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                      <Spinner size='sm' />
                      <span>Loading...</span>
                    </>
                  ) :'Sign Up'
                }
              </Button>
              <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
