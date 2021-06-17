import { Dialog, Transition } from "@headlessui/react";
import Cleave from "cleave.js/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRequestPaymentAction } from "../actions/paymentAction";
import LoadingScreen from "../components/layout/LoadingScreen";

export const ModalRequest = (props) => {
  const [value, setValue] = useState({
    amount: "",
    message: "",
  });

  const history = useHistory();

  const {
    fund: {
      payment_account: { paac_account_number },
      user_email,
    },
  } = useSelector((state) => state.userFund);
  const { loading, error, isSuccess } = useSelector(
    (state) => state.requestWallet
  );

  const dispatch = useDispatch();

  const handleSend = () => {
    if (value.amount) {
      const data = {
        from_email: user_email,
        to_email: props.email,
        payt_paac_account_number: paac_account_number,
        payt_dabet: value.amount,
        payt_desc: value.message,
      };

      dispatch(postRequestPaymentAction(data));
    }
  };

  if (isSuccess) {
    history.push(
      `/wallet/request/success?toWalletAmount=${value.amount}&toWalletEmail=${props.email}&from=/myaccount/summary`
    );
  }
  return (
    <Transition.Root show={props.pinModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={props.cancelButtonRef}
        open={props.pinModal}
        onClose={props.setPinModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {loading && <LoadingScreen />}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-medium text-gray-900 text-center"
                    >
                      Request to: {props.email}
                    </Dialog.Title>
                  </div>
                </div>
                <div className="flex mt-5">
                  <Cleave
                    className="mx-auto w-full p-2 border focus:ring-1 focus:ring-white focus:border-transparent text-center font-mono text-3xl"
                    style={{ border: 0 }}
                    options={{
                      numeral: true,
                      numeralThousandsGroupStyle: "thousand",
                      prefix: "Rp ",
                      rawValueTrimPrefix: true,
                    }}
                    onChange={(e) =>
                      setValue({ ...value, amount: e.target.rawValue })
                    }
                  />
                </div>
                <div className="flex mt-5">
                  <textarea
                    name="pesan"
                    id="pesan"
                    cols="40"
                    rows="3"
                    className="mx-auto rounded-xl"
                    placeholder="Pesan"
                    onChange={(e) =>
                      setValue({
                        ...value,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm mx-auto"
                  onClick={handleSend}
                  ref={props.cancelButtonRef}
                >
                  Send Request
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
