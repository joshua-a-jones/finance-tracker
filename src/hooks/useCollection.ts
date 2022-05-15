import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  DocumentData,
  collection as firestoreCollection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { getErrorMessage } from "../utils/errorHandling";

export interface DocumentDataWithId extends DocumentData {
  id: string;
}

export const useCollection = (collection: string) => {
  const [documents, setDocuments] = useState<null | DocumentDataWithId[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    let ref = firestoreCollection(db, collection);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => {
          return { ...doc.data, id: doc.id };
        });

        setDocuments(results);
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
