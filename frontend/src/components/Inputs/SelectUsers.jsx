import { useEffect, useState } from 'react';
import { LuUsers } from 'react-icons/lu';

import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';

import Modal from '../layouts/Modal';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button className='card-btn' onClick={() => setIsModalOpen(true)}>
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      <Modal title='Select Users' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className='space-y-4 h-[60vh] overflow-y-auto'>
          {allUsers.map((user) => (
            <div key={user._id} className=''>
              <img src={user.profileImageUrl} alt={user.name} />

              <div className=''>
                <p className=''>{user.name}</p>
                <p className=''>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
