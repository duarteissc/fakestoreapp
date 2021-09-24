import { useAPI } from '../context/ProvedorProducts'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
const Product = ({ addProductCar }) => {
    
    //Buscamos el id en la ruta para posterior buscarlo con el producto del context mediante id
    const router = useRouter();
    const { products, isLoading } = useAPI();
    const { id } = router.query;
    const product = products.find(product => product.id == id);

    //estilos default para no recrear un page de estilos producto completo
    return (
        <div className="container" style={{
            boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
            backgroundColor: "#fff",
            marginTop: "1rem", marginBottom: "1rem"
        }} >
            <div className="row">
                {
                    !isLoading ?
                        <>
                            <div className="col-sm-6" style={{ padding: "1em" }}>
                                <div id="carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div style={{
                                                position: "relative", top: "0", right: "0", bottom: "0", left: "0", display: "flex", width: "calc(100%)", alignItems: "center", justifyContent: "center", height: "calc(15em + 15vw)"
                                            }}>
                                                <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={product.image} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix">
                                    <div id="thumbcarousel" className="carousel slide" data-interval="false">
                                        <div className="carousel-inner">
                                            <div className="item active">
                                                <div data-target="#carousel" className="thumb" style={{
                                                    width: "25%", cursor: "pointer", float: "left", height: "calc(5em + 5vw)", display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}>
                                                    <img style={{ maxWidth: "100%", maxHeight: "100%", margin: "2px" }} src={product.image} />
                                                </div>
                                            </div>
                                        </div>
                                        <a className="left carousel-control" href="#thumbcarousel" role="button" data-slide="prev" style={{ backgroundImage: "none", color: "rgb(27, 36, 29)" }}>
                                            <span className="glyphicon glyphicon-chevron-left" />
                                        </a>
                                        <a className="right carousel-control" href="#thumbcarousel" role="button" data-slide="next" style={{ backgroundImage: "none", color: "rgb(27, 36, 29)" }}>
                                            <span className="glyphicon glyphicon-chevron-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{ padding: "calc(2em + 4vw)" }}>
                                <div>
                                    <div className="product-info" style={{ width: "100%" }}>
                                        <div style={{ marginBottom: "4px" }}>
                                            <h2 style={{ lineHeight: "1", marginBottom: "6px", marginTop: " 0", color: "#1B241D" }}>{product.title}</h2></div>
                                        <div className="product-price-discount" style={{ fontSize: "23px", fontWeight: "400", padding: "10px 0", clear: "both" }}><span>${parseFloat(product.price).toFixed(2)}</span>
                                        </div>
                                        <p style={{ fontSize: "18px", lineHeight: "24px", color: "#7a7a7a" }}>{product.description}</p>
                                        <div className="row">
                                            <Rating name="read-only" value={product.rating.rate} readOnly />
                                        </div>
                                        <div className="product-count" style={{ marginTop: "15px" }} >
                                            <a className="round-black-btn" onClick={() => {
                                                addProductCar(product)
                                            }} style={{
                                                fontSize: "15px",
                                                textDecoration: "none",
                                                background: "#212529",
                                                color: "#fff",
                                                width: "100%",
                                                textAlign: "center",
                                                padding: "14px",
                                                display: "inline-block",
                                                marginTop: "17px",
                                                border: " solid 2px #212529",
                                            }} >Agregar al cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <div style={{ textAlign: "center", margin: "2em" }}>
                            <div>
                                <Box> <CircularProgress /> </Box>
                            </div>
                            <Typography
                                variant="subtitle1"
                                noWrap
                                component="div">Loading...</Typography>
                        </div>
                }
            </div>
        </div>
    )
}
export default Product;

