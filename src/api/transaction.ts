import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface ITransaction {
  author_uid: string;
  name: string;
  amount: string;
  id?: string;
}
