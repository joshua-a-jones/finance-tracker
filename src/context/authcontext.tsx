import { createContext, useReducer } from "react";
import { User as FirebaseUser } from "@firebase/auth";

// type definitions
interface IAuthContext {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}
export interface IAuthState {
  user: FirebaseUser | null;
}
export interface AuthAction {
  type: AuthActions;
  payload: FirebaseUser | null;
}
export enum AuthActions {
  SET_USER,
}

// auth reducer
export const authReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// context and context provider
export const AuthContext = createContext<null | IAuthContext>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, authDispatch] = useReducer(authReducer, { user: null });

  const setUser = (user: FirebaseUser | null) => {
    authDispatch({ type: AuthActions.SET_USER, payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
