const modifyUser=async(userId)=>{
    window.location.replace(`/users/${userId}`)
}
const deleteUser=async(userId)=>{
    const responseDeleteUser = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });    
    if (responseDeleteUser.ok) { //si el registro fue OK, volverá un 201, entonces redirijo al form de login.
        Swal.fire({
            icon: 'success',
            title: 'User deleted!',
            text: 'User was successfully deleted,',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/");
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error deleting user!',
            text: 'User could not be deleted,',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        });
    }
}

const makePremium=async(userId)=>{
    const responseUpdateUser = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });    
    if (responseUpdateUser.ok) { //si el registro fue OK, volverá un 201, entonces redirijo al form de login.
        Swal.fire({
            icon: 'success',
            title: 'User updated to premium!',
            text: 'User was successfully updated to premium',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace(`/users/${userId}`);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error updating user!',
            text: 'User could not be updated,',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        });
    }
}

const makeUser=async(userId)=>{
    const responseUpdateUser = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });    
    if (responseUpdateUser.ok) { //si el registro fue OK, volverá un 201, entonces redirijo al form de login.
        Swal.fire({
            icon: 'success',
            title: 'User updated to user!',
            text: 'User was successfully updated to user',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace(`/users/${userId}`);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error updating user!',
            text: 'User could not be updated,',
            showConfirmButton: true,
            confirmButtonText: 'Accept'
        });
    }
}
