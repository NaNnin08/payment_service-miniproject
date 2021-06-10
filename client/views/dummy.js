import React, { useState } from "react";
import ButtonBayar from "../components/payment/ButtonBayar";

export default function Dummy() {
  const [testFungsi, setTestFungsi] = useState("");
  const [amount, setAmount] = useState(2550);
  const [payt, setPayt] = useState("");
  return (
    <div>
      <ButtonBayar
        amount={amount}
        onSuccess={setPayt}
        orderNumber={"ORNUa2235aaa12"}
      />
      {payt && <p>{payt.payt_trx_number}</p>}
    </div>
  );
}
