import { toast } from 'react-toastify';

export default function notify(status, content) {
    toast[status](content, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
}
