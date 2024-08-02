import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { theme } = useSelector((state) => state.theme);
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20text%20logo.png?alt=media&token=297704a5-b292-4267-a3b2-1a35b119f80e'
  const whiteLogo = 'https://firebasestorage.googleapis.com/v0/b/hardt4il.appspot.com/o/assets%2FHardtail%20logo%20white.png?alt=media&token=41d56f13-ff89-49fe-87b3-ef176fc965bb'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all of the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            Sign in. The good stuff is waiting.
          </p>
        </div>
        {/*right side*/}
        <div className = "flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput 
                type='email' 
                placeholder='name@company.com' 
                id='email' 
                onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput 
                type='password' 
                placeholder='********' 
                id='password' 
                onChange={handleChange}/>
            </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                      <Spinner size='sm' />
                      <span>Loading...</span>
                    </>
                  ) :'Sign In'
                }
              </Button>
              <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
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
