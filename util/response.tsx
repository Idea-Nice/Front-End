import Swal from "sweetalert2";

export const response = (response: any) => {
    if (response && response.status === 200) {
        return Swal.fire({
            text: response.message
        });
    } else if (response && response.status === 201) {
        return Swal.fire({
            text: response.message
        });
    } else if (response && response.status === 204) {
        return Swal.fire({
            text: response.message
        });
    }
};