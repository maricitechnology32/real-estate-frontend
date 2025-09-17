/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { logoutUser, getCurrentUser } from '../api/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };
  useEffect(() => {
    // This effect runs once to check if a user session exists via cookies
    const checkUserStatus = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.log(error);

        // No valid cookie, so user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  // This function is now simpler. It just updates the user state.
  const loginAction = (data) => {
    setUser(data.user);
  };

  // The logout function is also simpler
  const logOut = async () => {
    try {
      await logoutUser(); // Tells backend to clear the cookie
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
      setUser(null); // Force logout on the frontend regardless
    }
  };

  // The value no longer needs to contain the token
  const value = { user, loginAction, logOut, loading, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render the app until the initial auth check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;