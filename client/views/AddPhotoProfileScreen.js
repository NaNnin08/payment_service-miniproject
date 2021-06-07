import React, { useEffect, useState } from "react";
import bIcon from "../assets/images/B_icon.svg";
import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaulProfile from "../assets/images/defaultProfile.jpg";
import { updateUser } from "../actions/userActions";
import { showImage } from "./users/ApiDownloadProfile";

export default function AddPhotoProfileScreen() {
  const user = useSelector((state) => state.userFund);
  const { fund, isSuccess } = user;
  const dispatch = useDispatch();

  const [blob, setBlob] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    if (fund && !blob) {
      showImage(
        "/api/users/download/" + fund.user_avatar,
        fund.user_avatar
      ).then((result) => {
        if (result.error) {
          console.log("Get Image Failed");
        } else {
          const x = result;
          setFiles({ ...files, user_avatar: x });
          setBlob({ ...blob, user_avatar: URL.createObjectURL(result) });
        }
      });
    }
  }, []);

  const uploadSingleFile = (name) => (event) => {
    setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) });

    setFiles({ ...files, [name]: event.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = new FormData();

    user.append("user_avatar", files.user_avatar);

    dispatch(updateUser(user, fund.user_id));
  };

  if (isSuccess) {
    document.location.href = "/myaccount/profile";
  }

  return (
    <div className="bg-gray-200">
      <div className="bg-white w-full md:w-2/4 min-h-screen mx-auto relative flex flex-col">
        <Link to="/myaccount/profile">
          <div className="w-8 text-gray-400 absolute right-5 mt-2">
            <XIcon />
          </div>
        </Link>
        <div className="mx-auto mt-5">
          <img
            className="w-12 transform -rotate-6"
            src={bIcon}
            alt="bayar icon"
          />
        </div>
        <div className="mt-14 font-thin">
          <div className="flex">
            <h1 className="text-3xl mx-auto font-semibold">Choose a Photo</h1>
          </div>
          <p className="mt-5 max-w-xs mx-auto text-center">
            Your photo should clearly show your face so it’s easy for friends,
            family, and merchants know it’s you. A photo larger than 300 pixels
            works best.
          </p>
        </div>
        <div className="mx-auto mt-5">
          <img
            className="rounded-full mt-2"
            style={{ width: "150px", height: "150px" }}
            src={blob ? blob.user_avatar : defaulProfile}
            alt="default profile"
          />
        </div>
        {blob && (
          <div
            className="bg-blue-500 px-20 py-3 cursor-pointer w-1/2 mx-auto mt-5 text-center text-lg font-semibold text-white hover:bg-blue-600 rounded-2xl"
            onClick={handleSubmit}
          >
            Use this photo
          </div>
        )}
        <div className="relative mx-auto mt-5">
          <input
            type="file"
            name="file"
            id="file"
            style={{
              width: "0.1px",
              height: "0.1px",
              opacity: 0,
              overflow: "hidden",
              position: "absolute",
              zIndex: -1,
            }}
            onChange={uploadSingleFile("user_avatar")}
          />
          <label
            htmlFor="file"
            className={
              blob
                ? "text-blue-500 font-semibold text-lg cursor-pointer hover:underline"
                : "bg-blue-500 px-20 py-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 rounded-2xl"
            }
          >
            {blob ? "Choose a different photo" : "Add your photo"}
          </label>
        </div>
      </div>
    </div>
  );
}
