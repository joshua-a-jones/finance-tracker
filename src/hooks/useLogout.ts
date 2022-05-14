import { AuthActions } from "./../context/authcontext";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { signOut } from "@firebase/auth";
import { getErrorMessage } from "../utils/errorHandling";

export const useLogout = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const logoutUser = async () => {
    setIsPending(true);
    setError(null);

    try {
      // sign out from Firebase
      await signOut(auth);

      //logout locally
      setUser(null);

      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      setError(getErrorMessage(error));
    }
  };

  return { logoutUser, error, isPending };
};
