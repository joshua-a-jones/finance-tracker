import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getErrorMessage } from "../utils/errorHandling";
import { updateProfile } from "firebase/auth";

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

      if (!cred) throw new Error("Unable to complete signup");

      // add display name to user
      await updateProfile(cred.user, { displayName });

      setIsPending(false);
      setError(null);
    } catch (error: unknown) {
      console.log(error);
      setIsPending(false);
      setError(getErrorMessage(error));
    }
  };

  return { error, isPending, registerUser };
};
