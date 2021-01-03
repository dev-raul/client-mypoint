import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { stringFilterNumber } from "../utils/stringFilteNumber";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";
import Toast from "../utils/Toast";

import { ISession, IUser, IUserStorage } from "../@types";

export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpData {
  name: string;
  surname: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface AuthContextData {
  SignIn: (data: SignInData) => Promise<void>;
  SignUp: (data: SignUpData) => Promise<void>;
  SignOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<IUserStorage>>;
  user: IUserStorage;
  signed: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// import { Container } from './styles';
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUserStorage>({} as IUserStorage);

  useEffect(() => {
    (async () => {
      try {
        const storageToken = await AsyncStorage.getItem("@MyPoint:token");
        if (storageToken) {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`;
          const { data } = await api.get<IUser>("user");
          setUser({ 
            id: data.id,
            email: data.email,
            name: data.name,
            surname: data.surname,
            profile: data.profile
          });
          setSigned(true);
        } else {
          await AsyncStorage.removeItem("@MyPoint:token");
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  const SignIn = useCallback(async (request: SignInData) => {
    try {
      const { data } = await api.post<ISession>("/session", request);
      await AsyncStorage.setItem("@MyPoint:token", data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        surname: data.user.surname,
        profile: data.user.profile,
      });
      setSigned(true);
    } catch (err) {
      console.log('err', err)
      Toast("Opa, verifique as suas credenciais! :/");
    }
  }, []);
  const SignUp = useCallback(async (data: SignUpData) => {
    try {
      const res = await api.post("/user", { ...data, type: 1 });
      console.log("res.data", res.data);
      Toast(`A sua conta foi criada! :)`);
    } catch (err) {
      console.log("err", err.response.data);
      if (err.response) {
        if (err.response.data) {
          Toast(`${err.response.data.error} :/`);
          throw new Error();
        }
      }
      Toast("Opa, ocorreu um error tente novamente! :/");
    }
  }, []);

  const SignOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("@MyPoint:token");
      setSigned(false);
    } catch (err) {}
  }, []);

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignUp,
        SignOut,
        setUser,
        signed,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
