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

import { ISession } from "../@types";

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

  useEffect(() => {
    (async () => {
      const storageToken = await AsyncStorage.getItem("@MyPoint:token");
      if (storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setSigned(true);
      } else {
        await AsyncStorage.removeItem("@MyPoint:token");
      }
    })();
    setLoading(false);
  }, []);

  const SignIn = useCallback(async (request: SignInData) => {
    try {
      const { data } = await api.post<ISession>("/session", request);
      await AsyncStorage.setItem("@MyPoint:token", data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setSigned(true);
    } catch (err) {
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
        signed,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
