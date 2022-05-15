import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  collection as firestoreCollection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { getErrorMessage } from "../utils/errorHandling";

export interface DocumentWithId {
  id?: string;
}

export const useCollection = <T extends DocumentWithId>(
  collection: string,
  _queryConstraint?: QueryConstraint
) => {
  const [documents, setDocuments] = useState<null | T[]>(null);
  const [error, setError] = useState<null | string>(null);

  // _queryConstraint is a reference type, so need to use useRef to prevent infinite loop when it is used in useEffect
  const queryConstraint = useRef(_queryConstraint).current;

  useEffect(() => {
    let ref = firestoreCollection(db, collection);
    console.log("useEffect ran");
    const unsub = onSnapshot(
      queryConstraint ? query(ref, queryConstraint) : ref,
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
  }, [collection, queryConstraint]);

  return { documents, error };
};
