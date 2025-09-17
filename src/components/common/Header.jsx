import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { UserCircleIcon } from '@heroicons/react/24/outline'; // 1. Import the icon

const Header = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          Real Estate
        </Link>
        <nav className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link to="/properties" className="text-gray-600 hover:text-green-600">
            {t('propertiesLink')}
          </Link>

          {user ? (
            // If user is logged in
            <>
              {/* 2. Update the Link to include the icon */}
              <Link to="/dashboard/profile" className="flex items-center text-gray-600 hover:text-green-600 font-semibold">
                <UserCircleIcon className="h-6 w-6 mr-1" />
                {t('myProfileLink')}
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                {t('logoutButton')}
              </button>
            </>
          ) : (
            // If user is not logged in
            <>
              <Link to="/login" className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                {t('loginButton')}
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-green-600">
                {t('signUpLink')}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;