const fetch = require('isomorphic-fetch');


const sendGetProducts = async (ctx) => {
  //Cargamos la rutas desde un inicio para si el 
  //usuario quiere entrar a una categoria con id pueda entrar directamente
  const res = await fetch(`https://fakestoreapi.com/products`)
  const resJson = await res.json();
  return resJson
};


module.exports = {
  trailingSlash: true,
  exportPathMap: async function () {
    const posts = await sendGetProducts();
    const paths = {
      '/': { page: '/' },
      '/cart': { page: '/cart' },
    }


    // React dom, routes pre cargadas


    posts.forEach((product) => {
      paths[`/${(product.category).replace(/ /g, "_")}/${product.id}`] = { page: '/[category]/[id]' };
    });
    posts.forEach((product) => {
      paths[`/${(product.category).replace(/ /g, "_")}/`] = { page: '/[category]' };
    });
    console.log(paths)
    return paths;
  },
};
