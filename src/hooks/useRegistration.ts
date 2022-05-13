import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getErrorMessage } from "../utils/errorHandling";

export const useRegistration = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const registerUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      setIsPending(false);
      const user = cred.user;
    } catch (error: unknown) {
      console.log(error);
      setIsPending(false);
      setError(getErrorMessage(error));
    }
  };

  return { error, isPending, registerUser };
};
