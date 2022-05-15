import React, { useEffect } from "react";
import "./Home.css";
import TransactionForm from "./TransactionForm";
import { useCollection } from "../../hooks/useCollection";
import { ITransaction } from "../../api/transaction";
import TransactionList from "../../components/transactionList/TransactionList";
import { where } from "@firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection<ITransaction>(
    "transactions",
    where("author_uid", "==", user?.uid)
  );

  return (
    <div className="home">
      <div className="content">
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className="side-bar">
        <TransactionForm />
      </div>
    </div>
  );
}
