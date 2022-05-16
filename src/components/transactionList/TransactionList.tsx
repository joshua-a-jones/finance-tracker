import "./TransactionList.css";
import { ITransaction } from "../../api/transaction";
import { useFirestore } from "../../hooks/useFirestore";
import { TiDelete } from "react-icons/ti";

export interface TransactionListProps {
  transactions: ITransaction[];
}

export default function TransactionList(props: TransactionListProps) {
  const { transactions } = props;
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul className="transactions">
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className="name">{transaction.name}</p>
            <p className="amount">${transaction.amount}</p>
            <TiDelete
              className="delete-button"
              onClick={() => deleteDocument(transaction.id ?? "")}
            />
          </li>
        );
      })}
    </ul>
  );
}
