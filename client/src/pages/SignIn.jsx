import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';

const SignIn = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errorMesage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return setErrorMessage('Please fill all fields!');
    }
    
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
        {/*left side */}
        <div className='flex-1 flex flex-col justify-center items-start md:border-r-2'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>This is a demo project. You can sign in with your email and pasword or with google.</p>
        </div>
        {/*right  side */}
        <div className='flex-1'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
          </form>
          <div className='flex text-sm mt-5 gap-2'>
            <span>Do not have an account?</span>
            <Link to='/sign-up' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </div>
          {errorMesage && (
            <Alert className='mt-5' color='failure'>
              {errorMesage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn