import Swal from "sweetalert2"

export const alertTitle = (title: string) => {
    Swal.fire({
        title: title
    })
}

export const alertText = (text: string) => {
    Swal.fire({
        text: text
    })
}