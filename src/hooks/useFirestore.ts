import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { DocumentData, collection, addDoc } from "firebase/firestore";
import { getErrorMessage } from "../utils/errorHandling";
import { Timestamp } from "@firebase/firestore";

// type definitions
export interface IFirebaseState {
  document?: null | DocumentData;
  isPending?: boolean;
  error?: null | string;
  success?: null | boolean;
}
interface FirebaseAction {
  type: firebaseActions;
  payload?: IFirebaseState;
}

enum firebaseActions {
  IS_PENDING,
  ADD_DOC,
  ERROR,
}

let initialState: IFirebaseState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state: IFirebaseState, action: FirebaseAction) => {
  switch (action.type) {
    case firebaseActions.IS_PENDING:
      return {
        ...state,
        document: null,
        isPending: true,
        success: false,
        error: null,
      };
    case firebaseActions.ADD_DOC:
      return {
        ...state,
        document: action.payload?.document,
        isPending: false,
        success: true,
        error: null,
      };
    case firebaseActions.ERROR:
      return {
        ...state,
        isPending: false,
        success: false,
        document: null,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};

export const useFirestore = <T>(dbCollection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = collection(db, dbCollection);

  // helper function to only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: FirebaseAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (document: T) => {
    dispatch({ type: firebaseActions.IS_PENDING });
    try {
      const createdAt = Timestamp.fromDate(new Date());

      const addedDocument = await addDoc(collectionRef, {
        ...document,
        createdAt,
      });

      dispatchIfNotCancelled({
        type: firebaseActions.ADD_DOC,
        payload: { document: addedDocument },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: firebaseActions.ERROR,
        payload: { error: getErrorMessage(error) },
      });
    }
  };

  // delete document
  const deleteDocument = async (id: string) => {};

  // cleanup function in case component unmounts while waiting on async process
  useEffect(() => {
    setIsCancelled(false);
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
