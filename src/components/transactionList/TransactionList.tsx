import "./TransactionList.css";
import { ITransaction } from "../../api/transaction";

export interface TransactionListProps {
  transactions: ITransaction[];
}

export default function TransactionList(props: TransactionListProps) {
  const { transactions } = props;
  return (
    <ul className="transactions">
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className="name">{transaction.name}</p>
            <p className="amount">${transaction.amount}</p>
          </li>
        );
      })}
    </ul>
  );
}
