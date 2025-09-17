import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateUserProfile, changePassword, updateUserAvatar } from '../../api/userService';
import { useTranslation } from 'react-i18next';

const MyProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { t } = useTranslation();

  // State for profile details form
  const [formData, setFormData] = useState({ fullName: '', phoneNumber: '', address: '', bio: '' });
  const [profileMessage, setProfileMessage] = useState('');

  // State for password change form
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');

  // State for avatar update
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarMessage, setAvatarMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  const handleAvatarChange = (e) => setAvatarFile(e.target.files[0]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    try {
      const response = await updateUserProfile(formData);
      if (response.success) {
        updateUser(response.data);
        setProfileMessage(t('profileUpdatedSuccess'));
      }
    } catch (error) {
      setProfileMessage(error.message || t('profileUpdateError'));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    try {
      const response = await changePassword(passwordData);
      if (response.success) {
        setPasswordMessage(t('passwordChangedSuccess'));
        setPasswordData({ oldPassword: '', newPassword: '' });
      }
    } catch (error) {
      setPasswordMessage(error.message || t('passwordChangeError'));
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    setAvatarMessage('');
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await updateUserAvatar(formData);
      if (response.success) {
        updateUser(response.data);
        setAvatarMessage(t('avatarUpdatedSuccess'));
      }
    } catch (error) {
      setAvatarMessage(error.message || t('avatarUpdateError'));
    }
  };


  if (!user) return <div>{t('loading')}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('myProfile')}</h1>

      {/* Update Avatar Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('updateAvatar')}</h2>
        <form onSubmit={handleAvatarSubmit} className="flex items-center space-x-4">
          <img src={user.avatar?.url || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
          <input type="file" onChange={handleAvatarChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          <button type="submit" disabled={!avatarFile} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400">Update</button>
        </form>
        {avatarMessage && <p className="text-sm mt-2 text-green-600">{avatarMessage}</p>}
      </div>

      {/* Update Profile Details Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('fullName')}</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleProfileChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">{t('phoneNumber')}</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleProfileChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('address')}</label>
          <input type="text" name="address" value={formData.address} onChange={handleProfileChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">{t('bio')}</label>
          <textarea name="bio" value={formData.bio} onChange={handleProfileChange} rows="3" className="w-full px-3 py-2 mt-1 border rounded-md"></textarea>
        </div>
        {profileMessage && <p className="text-sm text-green-600">{profileMessage}</p>}
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">{t('saveChanges')}</button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('changePassword')}</h2>
        <div>
          <label htmlFor="oldPassword">{t('oldPassword')}</label>
          <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label htmlFor="newPassword">{t('newPassword')}</label>
          <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        {passwordMessage && <p className="text-sm text-green-600">{passwordMessage}</p>}
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">{t('changePassword')}</button>
      </form>
    </div>
  );
};

export default MyProfilePage;