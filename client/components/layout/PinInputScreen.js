import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import AlertInput from "./AlertInput";

export const PinInputScreen = (porps) => {
  const { fund } = useSelector((state) => state.userFund);
  const { payment_account } = fund;
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const changePin = (e) => {
      if (pin.length <= 6) {
        if (new RegExp("^[0-9]+$").test(e.key)) {
          if (pin.length < 6) {
            const changePin = pin + e.key;
            setPin(changePin);
          }
        }
        if (e.key === "Backspace") {
          const changePin = pin.substring(0, pin.length - 1);
          setPin(changePin);
        }
      }
    };
    window.addEventListener("keydown", changePin);

    if (pin.length === 6) {
      if (pin === payment_account.pacc_pin_number) {
        porps.data(true);
      } else {
        setIsError("Pin not match");
      }
    }

    const timeoutError = setTimeout(() => {
      setIsError(isError && false);
    }, 1000);

    return () => {
      window.removeEventListener("keydown", changePin);
      clearTimeout(timeoutError);
    };
  }, [pin]);

  return (
    <div className="absolute z-50 w-full">
      <div className="bg-blue-700 min-h-screen">
        <h1 className="text-4xl font-semibold text-white text-center pt-10">
          Input Your Pin
        </h1>
        {isError && <AlertInput data={isError} />}
        <div className="grid grid-cols-6 mt-14 text-center h-10v place-items-center w-full md:w-1/2 mx-auto">
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 1 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 2 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 3 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 4 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 5 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
          <div
            className={
              "col-span-1 flex items-center " +
              (pin.length && pin.length >= 6 ? "text-black" : "text-gray-400")
            }
          >
            <FontAwesomeIcon size="1x" icon={faCircle} spin />
          </div>
        </div>
      </div>
    </div>
  );
};
