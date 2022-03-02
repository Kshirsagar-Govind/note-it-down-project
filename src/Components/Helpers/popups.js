import { toast } from 'react-toastify';

export const SuccessNotify = (msg) => {
    toast.success(msg, {
        position: "top-right", theme: 'colored',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export const ErrorNotify = (msg) => {
    toast.error(msg, {
        position: "top-right", theme: 'colored',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const WarningNotify = (msg) => {
    toast.warning(msg, {
        theme: 'colored',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });
}



export const InfoNotify = (msg) => {
    toast.info(msg, {
        theme: 'colored',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });
}


