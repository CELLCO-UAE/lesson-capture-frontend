import Swal from "sweetalert2";
import "./toast.css";

export const Notify = ({ icon = "success", message }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      container: "custom-toast-container",
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    text: message,
  });
};

export const ConfirmationNotify = ({
  icon = "warning",
  title,
  text,
  ...rest
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    customClass: {
      container: "custom-toast-container",
    },
    ...rest,
  });
};
