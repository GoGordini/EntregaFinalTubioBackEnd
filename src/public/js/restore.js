const form = document.getElementById('restoreForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userEmail = form.elements.userEmail.value;
    if (userEmail){
    const obj = {email:userEmail}
    const responseUser= await fetch('/api/users/restore', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
       if (responseUser.ok) {
        Swal.fire({
            icon: 'success',
            text: 'Le hemos enviado un email!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/login");
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            text: 'El usuario ingresado no existe!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        });
}; 

    }
})
 
