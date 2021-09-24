import Head from 'next/head'
import NavBar from '../components/NavBar'
import CartProducts from '../components/CartProducts'
import Router from 'next/router'
const Cart = ({ cart, addProductCar, deleteProductsCar, deleteProductCar }) => {
  return (
    <>
      <Head >
        <title>Fakestore | Cart </title>
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossOrigin="anonymous"></script>
        <link rel="icon" href="/descarga.png" />
      </Head>
      <NavBar cart={cart} type={0} />

      {cart.length > 0 ?
        //Carrito con productos
        <CartProducts  style={{marginTop:"4em"}}  cart={cart} addProductCar={addProductCar} deleteProductsCar={deleteProductsCar} deleteProductCar={deleteProductCar} />
        :
        //Codigo para aviso de cart vacio
        <div style={{ textAlign: "center", marginTop: "5em" }}>
          <style dangerouslySetInnerHTML={{ __html: "\n\ndiv#oxy-shopping-cart-wrapper {\n  background: #fff;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 48px;\n}\n\ndiv#oxy-shopping-cart-wrapper p {\n  text-align: center;\n  color: #666;\n  font-size: 16px;\n  line-height: 24px;\n}\n\ndiv#oxy-shopping-cart-wrapper a {\n  color: #fff; \n background: #1B241D;\n  font-weight: bold;\n  text-decoration: none;\n  letter-spacing: 1px;\n  font-size: 16px;\n  line-height: 24px;\n  padding: 18px 32px;\n  transition: all ease 0.2s;\n  margin-bottom: 12px;\n}\n\ndiv#oxy-shopping-cart-wrapper a:hover {\n  color: #FFF;\n  border: 1px solid #085888;\n}\n" }} />
          <div id="oxy-shopping-cart-wrapper">
            <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-shopping-bag-2.png&r=153&g=153&b=153" width={48} height={48} />
            <p>Carrito vacío<br />agrega algunos productos</p>
            <a onClick={() => { Router.push('/') }}>IR A COMPRAR</a>
          </div>
        </div>
      }
    </>
  )
}

export default Cart

