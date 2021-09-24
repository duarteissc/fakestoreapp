import React, { useContext, useState, useEffect, createContext } from "react";

const ContextProducts = createContext();

function ProvedorProducts({ children }) {

    //productos 
    const [products, setProducts] = useState([]);

    //Fetch cargado
    const [isLoading, setIsLoading] = useState(true);


    //Obtener productos al cargar componentes 
    useEffect( async() => {
        const res = await fetch('https://fakestoreapi.com/products', {
            method: 'GET', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
            if (!response.ok) throw Error(response.status);
            return response;
        }).then(response => response.json())
        .catch(error => {
            console.log(error)
            alert(error)
        });
        setProducts(res);
        setIsLoading(false);
    }, []);

    return (
        <ContextProducts.Provider value={{ products, setProducts, isLoading}}>
            {children}
        </ContextProducts.Provider>
        );
}

export default ProvedorProducts;

export function useAPI() {
    //validamos los usestate esten cargados
    const context = useContext(ContextProducts);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}