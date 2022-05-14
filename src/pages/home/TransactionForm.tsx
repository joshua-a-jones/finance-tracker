import { FormEvent, useState } from "react";

export default function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
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
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </label>
        <button className="button" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}
