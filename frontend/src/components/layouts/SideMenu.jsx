import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/userContext';

import { capitalizeName } from '../../utils/helper';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

import DEFAULT_PROFILE from '../../assets/images/default_profile.png';

const SideMenu = ({ activeMenu }) => {
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();

    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }

    return () => {};
  }, [user]);
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 sticky top-[61px] z-20'>
      <div className='flex flex-col justify-center items-center mb-7 pt-5'>
        <div className='relative'>
          <img
            className='w-20 h-20 bg-slate-400 rounded-full'
            src={user?.profileImageUrl || DEFAULT_PROFILE}
            alt='Profile Image'
          />
        </div>

        {user?.role === 'admin' ? (
          <div className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>
            Admin
          </div>
        ) : (
          <div className='text-[10px] font-medium text-white bg-green-400 px-3 py-0.5 rounded mt-1'>
            Member
          </div>
        )}

        <h5 className='text-gray-950 font-medium leading-6 mt-3'>
          {capitalizeName(user?.name) || ''}
        </h5>

        <p className='text-[12px] text-gray-500'>{user?.email || ''}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? 'text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3' : ''} px-6 py-3 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
