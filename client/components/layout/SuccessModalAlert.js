import React from "react";

export const SuccessModalAlert = (props) => {
  return (
    <div className="bg-green-400 p-1 mt-5 text-center rounded">
      {props.data}
    </div>
  );
};
