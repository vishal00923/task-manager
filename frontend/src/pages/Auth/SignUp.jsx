import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import AuthLayout from '../../components/layouts/AuthLayout';

import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import { axiosInstance } from '../../utils/axiosInstance';
import { uploadImage } from '../../utils/uploadImage';

import { UserContext } from '../../context/userContext';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [adminIviteToken, setAdminIviteToken] = useState('');

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!fullName) {
      setError('Please enter full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setError('');

    // SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminIviteToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong, please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              type='text'
              value={fullName}
              label='Full Name'
              placeholder='John'
              onChange={({ target }) => setFullName(target.value)}
            />

            <Input
              type='text'
              value={email}
              label='Email Address'
              placeholder='john@example.com'
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
              type='password'
              value={password}
              label='Password'
              placeholder='Min 8 Characters'
              onChange={({ target }) => setPassword(target.value)}
            />

            <Input
              type='text'
              value={adminIviteToken}
              label='Admin Invite Token'
              placeholder='6 Digit Code'
              onChange={({ target }) => setAdminIviteToken(target.value)}
            />
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'> {error}</p>}

          <button className='btn-primary' type='submit'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already an account?{' '}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
