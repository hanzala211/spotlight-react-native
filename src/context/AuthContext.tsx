import { authServices } from '@services';
import { IUser } from '@types';
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextTypes {
  userData: IUser | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  authErrorMessage: string;
  setAuthErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  signup: (data: unknown) => void;
  login: (data: unknown) => void;
  isAuthLoading: boolean;
  isSplashScreenLoading: boolean;
  setIsSplashScreenLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isSplashScreenLoading, setIsSplashScreenLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      if (token && userData === null) {
        me();
      } else {
        setIsSplashScreenLoading(false);
      }
    };
    if (userData !== null) return;
    checkToken();
  }, [userData]);

  const signup = async (data: unknown) => {
    try {
      setIsAuthLoading(true);
      setAuthErrorMessage('');
      const response = await authServices.signup(data);
      console.log('Response:', response);
      if (response.status === 200) {
        setUserData(response.data.user);
        await AsyncStorage.setItem("token", response.data.token)
      }
    } catch (error) {
      console.log(error);
      setAuthErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error),
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = async (data: unknown) => {
    try {
      setIsAuthLoading(true);
      const response = await authServices.login(data);
      console.log('Response:', response);
      if (response.status === 200) {
        setUserData(response.data.user);
        await AsyncStorage.setItem("token", response.data.token)
      }
    } catch (error) {
      console.log(error);
      setAuthErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error),
      );
    } finally {
      setIsAuthLoading(false);
    }
  };

  const me = async () => {
    try {
      setIsSplashScreenLoading(true)
      const response = await authServices.me();
      if (response.status === 200) {
        setIsSplashScreenLoading(false)
        setUserData(response.data.user)
      }
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("token")
    }
    finally {
      setIsSplashScreenLoading(false)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        authErrorMessage,
        setAuthErrorMessage,
        signup,
        login,
        isAuthLoading,
        isSplashScreenLoading,
        setIsSplashScreenLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use useAuth inside Auth Provider');
  }
  return context;
};
