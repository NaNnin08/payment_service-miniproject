import React, { useState } from "react";
import ButtonBayar from "../components/payment/ButtonBayar";

export default function Dummy() {
  const [testFungsi, setTestFungsi] = useState("");
  const [amount, setAmount] = useState(6250);
  const [payt, setPayt] = useState("");
  return (
    <div className="w-1/5">
      <ButtonBayar
        amount={amount}
        onSuccess={setPayt}
        orderNumber={"ORNUa2235aaa120"}
      />
      {payt && <p>{payt.payt_trx_number}</p>}
    </div>
  );
}
