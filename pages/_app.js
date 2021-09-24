
import ProvedorProducts from '../context/ProvedorProducts'
import { useState } from 'react';
function MyApp({ Component, pageProps }) {
  const [cart, cambiarCarrito] = useState([]);

  //Las funciones las suelo poner en el app.js igual se puede crear en el context y llamarlas

  //AddProduct
  const addProductCar = (product) => {
    //Agregamos producto por 1era vez
    if (cart.length === 0) {
      cambiarCarrito([{
        id: product.id,
        total: product.price,
        title: product.title,
        image: product.image,
        description: product.description,
        quantity: 1,
        price: product.price
      }]);

    } else {
      //De otra forma tenemos que revisar que el cart no tenga ya el proudcto que queremos agregar
      //Para poder editar el arreglo tenemos que clonarlo
      const newCart = [...cart];

      //Comprobamos si el cart ya tiene el ID del pruducto a agregar
      const InCart = newCart.filter((productoDeCarrito) => {
        return productoDeCarrito.id === product.id
      }).length > 0;


      if (InCart) {
        //Para actualizarlo buscamos mediante el id y actualizamos valores
        newCart.forEach((productDeCarrito, index) => {
          if (productDeCarrito.id == product.id) {
            const quantity = newCart[index].quantity;
            newCart[index] =
            {
              id: product.id,
              title: product.title,
              description: product.description,
              total: (quantity + 1) * product.price,
              price: product.price,
              image: product.image,
              quantity: quantity + 1
            }
          }
        });
        //Si no es el primer producto a agregar pero es el primero de su tipo lo agregamos
      } else {
        newCart.push(
          {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            total: product.price,
            image: product.image,
            quantity: 1
          }
        );
      }
      cambiarCarrito(newCart)
    }
  }
    //Delete1Product
  const deleteProductCar = (product) => {
    const nuevoCarrito = [...cart];

    const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
      return productoDeCarrito.id === product.id
    }).length > 0;
    if (yaEstaEnCarrito) {
      nuevoCarrito.forEach((productDeCarrito, index) => {
        if (productDeCarrito.id == product.id && productDeCarrito.quantity > 1) {
          const quantity = nuevoCarrito[index].quantity;
          nuevoCarrito[index] =
          {
            id: product.id,
            title: product.title,
            description: product.description,
            total: (quantity - 1) * product.price,
            price: product.price,
            image: product.image,
            quantity: quantity - 1
          }
        }
      });

    }
    cambiarCarrito(nuevoCarrito)
  }
      //DeleteProductById
  const deleteProductsCar = (idProductoEliminar) => {
    var nuevoCarrito3 = [...cart];
    nuevoCarrito3 = cart.filter(function (carritoId) {
      return carritoId.id !== idProductoEliminar.id;
    });
    cambiarCarrito(nuevoCarrito3)

  };
  return (
    <ProvedorProducts>
    
        <Component {...pageProps} cart={cart} addProductCar={addProductCar} deleteProductCar={deleteProductCar} deleteProductsCar={deleteProductsCar} />
     
    </ProvedorProducts>
  )

}

export default MyApp
