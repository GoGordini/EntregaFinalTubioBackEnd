//const socket = io()
const addToCart = (_id, cid) => {
    const amount = { "quantity": 1 };

    fetch(`/api/carts/${cid}/product/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(amount),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(() => {
        Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        position: "left", 
        gravity: "top",
        backgroundColor: '#28a745',
        }).showToast();
    })
    .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
    });
}


const incrementQuantity = (_id, cid) => {
    const amount = {"quantity": 1};

    fetch(`/api/carts/${cid}/product/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(amount),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(json => {
        {console.log(json);
        location.reload()};
    })
    
}

    //console.log("Agregado");

const decrementQuantity = (_id,cid,product_quantity) => {
    const amount = {"quantity":-1};
    if (product_quantity>1){
    fetch(`/api/carts/${cid}/product/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(amount),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(result => result.json()).then(json => {console.log(json); location.reload()})}
}

const removeProduct = (pid,cid)=>{
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => {console.log(json); location.reload()})
    }

    // const finishPurchase   = (cid)=>{
    //     fetch(`/api/carts/${cid}/purchase`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(result => result.json()).then(json => {console.log(json)})
    //     }    
    const finishPurchase   = async(cid)=>{
        const responsePurchase = await fetch(`/api/carts/${cid}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseCart = await fetch(`/api/carts/${cid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const cartData = await responseCart.json();
        console.log(cartData)
        if (responsePurchase.ok && cartData.payload.products.length==0) { 
            Swal.fire({
                icon: 'success',
                title: "Gracias por su compra!",
                text: 'En breve recibirá un email con los detalles',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("/products");
                }
            });
        }
        if (responsePurchase.ok && cartData.payload.products.length>0) { 
            Swal.fire({
                icon: 'success',
                title: "Gracias por su compra!",
                text: 'Algunos productos no poseen stock suficiente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        }
        if (!responsePurchase.ok) { 
            Swal.fire({
                icon: 'error',
                text: 'Su compra no se pudo procesar',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } 
    }
       