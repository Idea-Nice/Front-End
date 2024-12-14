import Swal from "sweetalert2";

export const error = (error: any) => {
    if (error && error.status === 400) {
        return Swal.fire({
            text: error.message
        });
    } else if (error && error.status === 401) {
        return Swal.fire({
            text: error.message
        });
    } else if (error && error.status === 404) {
        return Swal.fire({
            text: error.message
        });
    } else if (error && error.status === 409) {
        return Swal.fire({
            text: error.message
        });
    } else {
        return Swal.fire({
            text: error.message
        });
    }
};