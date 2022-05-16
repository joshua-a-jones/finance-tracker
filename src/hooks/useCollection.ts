import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  collection as firestoreCollection,
  onSnapshot,
  query,
  orderBy,
  QueryConstraint,
  Query,
} from "firebase/firestore";
import { getErrorMessage } from "../utils/errorHandling";

export interface DocumentWithId {
  id?: string;
}

export const useCollection = <T extends DocumentWithId>(
  collection: string,
  _queryConstraint?: QueryConstraint,
  _orderBy?: QueryConstraint
) => {
  const [documents, setDocuments] = useState<null | T[]>(null);
  const [error, setError] = useState<null | string>(null);

  // _queryConstraint is a reference type, so need to use useRef to prevent infinite loop when it is used in useEffect
  const queryConstraint = useRef(_queryConstraint).current;
  const orderConstraint = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestoreCollection(db, collection);

    // construct query based on optional parameters. If all query params ae missing, then query is null
    let q: Query | null;
    if (queryConstraint && orderConstraint) {
      q = query(ref, queryConstraint, orderConstraint);
    } else if (queryConstraint) {
      q = query(ref, queryConstraint);
    } else if (orderConstraint) {
      q = query(ref, orderConstraint);
    } else {
      q = null;
    }

    console.log("useEffect ran");
    const unsub = onSnapshot(
      q ? q : ref,
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
  }, [collection, queryConstraint, orderConstraint]);

  return { documents, error };
};
