import React from "react";
import "./Home.css";
import TransactionForm from "./TransactionForm";

export default function Home() {
  return (
    <div className="home">
      <div className="content">transaction list</div>
      <div className="side-bar">
        <TransactionForm />
      </div>
    </div>
  );
}
