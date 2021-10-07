import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../store/actions";
export default function ToastNotification(props) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([
    "info",
    "success",
    "error",
    "warning",
    "default",
  ]);
  const notify = () => {
    let variant = props.notification.variant
      ? props.notification.variant
      : "success";
    if (status.indexOf(variant) > -1) {
      toast[`${variant}`](props.notification.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        dispatch(showNotificationWithMessage(null));
      }, 2000);
    }
  };
  useEffect(() => {
    notify();
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
