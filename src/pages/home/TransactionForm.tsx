import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ITransaction } from "../../api/transaction";

export default function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { response, addDocument } = useFirestore<ITransaction>("transactions");
  const { user } = useAuthContext();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      addDocument({ author_uid: user.uid, name, amount });
    }
  };

  const handleAmountInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    // only want to accept valid numbers
    if (e.target.value.length > 0 && isNaN(Number(e.target.value))) {
      e.target.classList.add("invalid");
      e.target.setCustomValidity("Amount must be a number");
    } else {
      e.target.classList.remove("invalid");
      e.target.setCustomValidity("");
    }
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);
  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Transaction Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label>
          <span>Transaction Amount</span>
          <input
            type="text"
            required
            value={amount}
            onChange={(e) => handleAmountInputChange(e)}
          ></input>
        </label>
        <button className="button" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}
