const form = document.getElementById('resetForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const responseUser= await fetch('/api/users/reset', {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
       if (responseUser.ok) { 
        Swal.fire({
            icon: 'success',
        
            text: 'La contraseña se ha restablecido con éxito!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/login");}})}
                 else{
        if (responseUser.status === 401) {window.location.replace('/restore')
       } else {
        Swal.fire({
        icon: 'error',
        text: 'La nueva contraseña debe ser diferente de la anterior',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
    }).then(() => {
    });}; 
        }
    })