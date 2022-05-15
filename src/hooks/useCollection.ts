import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection as firestoreCollection,
  onSnapshot,
} from "firebase/firestore";
import { getErrorMessage } from "../utils/errorHandling";

export interface DocumentWithId {
  id?: string;
}

export const useCollection = <T extends DocumentWithId>(collection: string) => {
  const [documents, setDocuments] = useState<null | T[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let ref = firestoreCollection(db, collection);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDocuments(results as T[]);
      },
      (error) => {
        setError(getErrorMessage(error));
      }
    );

    // unsubscribe cleanup function
    return unsub;
  }, [collection]);

  return { documents, error };
};
