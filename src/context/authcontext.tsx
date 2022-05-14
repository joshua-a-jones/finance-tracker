import { createContext, useReducer } from "react";
import { User as FirebaseUser } from "@firebase/auth-types";

// type definitions
interface IAuthContext {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser) => void;
}
interface IAuthState {
  user: FirebaseUser | null;
}
interface AuthAction {
  type: AuthActions;
  payload: FirebaseUser | null;
}
enum AuthActions {
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
