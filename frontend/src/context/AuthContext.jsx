import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Default seed demo user credentials
const DEFAULT_DEMO_USER = {
  _id: 'mock-user-id-001',
  name: 'Demo User',
  email: 'demo@example.com',
  phone: '6203130623',
  password: 'password123',
  role: 'customer',
  isAdmin: false,
  isVerified: true,
};

export const AuthProvider = ({ children }) => {
  // Global Auth User State (Initialized from localStorage)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [pendingVerification, setPendingVerification] = useState({
    emailOrPhone: '',
    suggestedOtp: '',
    isResetMode: false,
  });

  // Mobile Phone SMS Push Notification Toast State
  const [smsNotification, setSmsNotification] = useState(null);

  // Initialize Mock Users Database in localStorage if not already set
  useEffect(() => {
    const existingMockUsers = localStorage.getItem('mock_users_db');
    if (!existingMockUsers) {
      localStorage.setItem('mock_users_db', JSON.stringify([DEFAULT_DEMO_USER]));
    }
  }, []);

  // Helper: Retrieve all mock users from localStorage
  const getMockUsers = () => {
    try {
      const saved = localStorage.getItem('mock_users_db');
      return saved ? JSON.parse(saved) : [DEFAULT_DEMO_USER];
    } catch (e) {
      return [DEFAULT_DEMO_USER];
    }
  };

  // Helper: Save updated mock users list into localStorage
  const saveMockUsers = (usersList) => {
    localStorage.setItem('mock_users_db', JSON.stringify(usersList));
  };

  // Helper: Set global auth state & store mock JWT token + user in localStorage
  const setAuthState = (userObj, tokenStr = 'mock-jwt-token-12345') => {
    const userToSave = {
      _id: userObj._id || `mock-id-${Date.now()}`,
      name: userObj.name || 'Demo User',
      email: userObj.email || '',
      phone: userObj.phone || '',
      role: userObj.role || 'customer',
      isAdmin: !!userObj.isAdmin,
      isVerified: true,
      token: tokenStr,
    };
    setUser(userToSave);
    localStorage.setItem('userInfo', JSON.stringify(userToSave));
    localStorage.setItem('token', tokenStr);
  };

  // Helper: Clear auth state & remove token/userInfo from localStorage
  const clearAuthState = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };

  // Wipe all saved mock accounts & local storage
  const resetAllAccounts = async () => {
    clearAuthState();
    localStorage.setItem('mock_users_db', JSON.stringify([DEFAULT_DEMO_USER]));
    return { success: true, message: 'All mock accounts cleared & reset to demo user.' };
  };

  /**
   * MOCK LOGIN FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/login`))
   */
  const login = async (emailOrPhone, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!emailOrPhone || !password) {
          return reject(new Error('Please provide email/phone and password'));
        }

        const isEmail = emailOrPhone.includes('@');
        const mockUsers = getMockUsers();

        // Search for user in mock database
        let foundUser = mockUsers.find((u) => {
          const userIdentifier = isEmail ? u.email?.toLowerCase() : u.phone;
          return userIdentifier === emailOrPhone.toLowerCase() || u.phone === emailOrPhone;
        });

        // If user found, check password match
        if (foundUser) {
          if (foundUser.password && foundUser.password !== password) {
            return reject(new Error('Invalid credentials. Incorrect password.'));
          }
          setAuthState(foundUser, 'mock-jwt-token-12345');
          setIsLoginModalOpen(false);
          return resolve(foundUser);
        }

        // If user not found, create new mock account & log in seamlessly
        const newMockUser = {
          _id: `mock-id-${Date.now()}`,
          name: emailOrPhone.split('@')[0] || 'Demo User',
          email: isEmail ? emailOrPhone.toLowerCase() : '',
          phone: !isEmail ? emailOrPhone : '',
          password: password,
          role: 'customer',
          isAdmin: false,
          isVerified: true,
        };

        mockUsers.push(newMockUser);
        saveMockUsers(mockUsers);

        setAuthState(newMockUser, 'mock-jwt-token-12345');
        setIsLoginModalOpen(false);
        resolve(newMockUser);
      }, 300); // Realistic 300ms network delay simulation
    });
  };

  /**
   * MOCK SIGNUP / REGISTER FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/register`))
   */
  const register = async (name, emailOrPhone, password, role = 'customer') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = emailOrPhone.includes('@');
        const mockUsers = getMockUsers();

        // Generate 6-digit random verification code
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        let existingUser = mockUsers.find((u) => {
          const userIdentifier = isEmail ? u.email?.toLowerCase() : u.phone;
          return userIdentifier === emailOrPhone.toLowerCase() || u.phone === emailOrPhone;
        });

        if (existingUser) {
          existingUser.name = name || existingUser.name;
          existingUser.password = password;
          existingUser.verificationCode = otpCode;
        } else {
          const newUser = {
            _id: `mock-id-${Date.now()}`,
            name: name || 'Demo User',
            email: isEmail ? emailOrPhone.toLowerCase() : '',
            phone: !isEmail ? emailOrPhone : '',
            password: password,
            role: role || 'customer',
            isAdmin: false,
            isVerified: false,
            verificationCode: otpCode,
          };
          mockUsers.push(newUser);
        }

        saveMockUsers(mockUsers);

        // Set pending verification state & top notification banner
        setPendingVerification({
          emailOrPhone,
          suggestedOtp: otpCode,
          isResetMode: false,
        });

        setSmsNotification({
          phone: emailOrPhone,
          otp: otpCode,
          timestamp: '11:03 AM',
        });

        setIsLoginModalOpen(false);
        setIsVerifyModalOpen(true);

        resolve({
          requiresVerification: true,
          emailOrPhone,
          verificationCode: otpCode,
          message: `SMS OTP code sent to ${emailOrPhone}`,
        });
      }, 300);
    });
  };

  /**
   * MOCK RESEND OTP FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/resend-otp`))
   */
  const resendOtp = async (emailOrPhone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();

        setPendingVerification({
          emailOrPhone,
          suggestedOtp: freshOtp,
          isResetMode: false,
        });

        setSmsNotification({
          phone: emailOrPhone,
          otp: freshOtp,
          timestamp: 'Just now',
        });

        setIsLoginModalOpen(false);
        setIsVerifyModalOpen(true);

        resolve({
          success: true,
          emailOrPhone,
          verificationCode: freshOtp,
          message: `New SMS OTP code sent to ${emailOrPhone}`,
        });
      }, 300);
    });
  };

  /**
   * MOCK OTP VERIFICATION FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/verify-otp`))
   */
  const verifyOtp = async (emailOrPhone, otp) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!otp || otp.length !== 6) {
          return reject(new Error('Please enter a valid 6-digit OTP code'));
        }

        const isEmail = emailOrPhone.includes('@');
        const mockUsers = getMockUsers();

        let foundUser = mockUsers.find((u) => {
          const userIdentifier = isEmail ? u.email?.toLowerCase() : u.phone;
          return userIdentifier === emailOrPhone.toLowerCase() || u.phone === emailOrPhone;
        });

        if (!foundUser) {
          foundUser = {
            _id: `mock-id-${Date.now()}`,
            name: 'Verified Customer',
            email: isEmail ? emailOrPhone.toLowerCase() : '',
            phone: !isEmail ? emailOrPhone : '',
            password: 'password123',
            role: 'customer',
            isAdmin: false,
            isVerified: true,
          };
          mockUsers.push(foundUser);
        } else {
          foundUser.isVerified = true;
        }

        saveMockUsers(mockUsers);

        setAuthState(foundUser, 'mock-jwt-token-12345');
        setIsVerifyModalOpen(false);
        resolve(foundUser);
      }, 300);
    });
  };

  /**
   * MOCK FORGOT PASSWORD FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/forgot-password`))
   */
  const forgotPassword = async (emailOrPhone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();

        setPendingVerification({
          emailOrPhone,
          suggestedOtp: freshOtp,
          isResetMode: true,
        });

        setSmsNotification({
          phone: emailOrPhone,
          otp: freshOtp,
          timestamp: 'Just now',
        });

        setIsLoginModalOpen(false);
        setIsVerifyModalOpen(true);

        resolve({
          requiresVerification: true,
          emailOrPhone,
          verificationCode: freshOtp,
        });
      }, 300);
    });
  };

  /**
   * MOCK RESET PASSWORD FUNCTION
   * TODO: Replace with real API endpoint later (e.g., fetch(`http://localhost:5001/api/auth/reset-password`))
   */
  const resetPasswordWithOtp = async (emailOrPhone, otp, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!newPassword) {
          return reject(new Error('Please enter a new password'));
        }

        const isEmail = emailOrPhone.includes('@');
        const mockUsers = getMockUsers();

        let foundUser = mockUsers.find((u) => {
          const userIdentifier = isEmail ? u.email?.toLowerCase() : u.phone;
          return userIdentifier === emailOrPhone.toLowerCase() || u.phone === emailOrPhone;
        });

        if (foundUser) {
          foundUser.password = newPassword;
          foundUser.isVerified = true;
          saveMockUsers(mockUsers);
        }

        setIsVerifyModalOpen(false);
        setIsLoginModalOpen(true);
        resolve({ success: true, message: 'Password reset successful!' });
      }, 300);
    });
  };

  /**
   * MOCK LOGOUT FUNCTION
   * TODO: Replace with real API endpoint later if server-side session invalidation is needed
   */
  const logout = () => {
    clearAuthState();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isVerifyModalOpen,
        setIsVerifyModalOpen,
        pendingVerification,
        smsNotification,
        setSmsNotification,
        resetAllAccounts,
        login,
        register,
        resendOtp,
        verifyOtp,
        forgotPassword,
        resetPasswordWithOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
