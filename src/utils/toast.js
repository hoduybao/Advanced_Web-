import { toast } from 'react-toastify';

export default function notify(status, content,position) {
    toast[status](content, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',

    });
}
