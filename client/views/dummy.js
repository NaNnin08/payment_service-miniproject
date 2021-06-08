import React, { useState } from "react";
import ButtonBayar from "../components/payment/ButtonBayar";

export default function Dummy() {
  const [testFungsi, setTestFungsi] = useState("");
  const [amount, setAmount] = useState(1000.99);
  const [payt, setPayt] = useState("");
  return (
    <div>
      <ButtonBayar
        amount={amount}
        onSuccess={setPayt}
        orderNumber={"ORNUM12121"}
      />
      {payt && <p>{payt.payt_trx_number}</p>}
    </div>
  );
}
