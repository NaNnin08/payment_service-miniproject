import React, { useState } from "react";
import ButtonBayar from "../components/payment/ButtonBayar";

export default function Dummy() {
  const [testFungsi, setTestFungsi] = useState("");

  const handleFungsi = (data) => {
    setTestFungsi(data);
  };
  return (
    <div>
      <ButtonBayar
        amount={1000.78}
        onSuccess={handleFungsi}
        orderNumber={"ORNUM12121"}
      />
      {testFungsi && <p>{testFungsi}</p>}
    </div>
  );
}
