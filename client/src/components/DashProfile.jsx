import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react'

const DashProfile = () => {

  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 font-semibold text-center text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt='profile-pic' className='w-full h-full rounded-full border-8 border-[lightgray] object-cover'/>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='Password' defaultValue=''/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='flex justify-between mt-5 text-red-500'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile