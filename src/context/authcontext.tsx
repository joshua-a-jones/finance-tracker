import { createContext, useReducer } from "react";
import { User as FirebaseUser } from "@firebase/auth-types";
import { ActionCodeOperation } from "@firebase/auth";

interface IAuthContext {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser) => void;
}

interface IAuthState {
  user: FirebaseUser | null;
}

export const AuthContext = createContext<null | IAuthContext>(null);

export type AuthAction = {
  type: AuthActions;
  payload: FirebaseUser | null;
};

enum AuthActions {
  SET_USER,
}

export const authReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const setUser = (user: FirebaseUser) => {
    dispatch({
      type: AuthActions.SET_USER,
      payload: user,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
