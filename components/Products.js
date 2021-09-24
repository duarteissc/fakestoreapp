import Router from 'next/router'
import { useAPI } from '../context/ProvedorProducts'
// import { CartPlus } from 'react-bootstrap-icons'
// import Stock from './Validaciones/Stock';

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';


import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";

const styles =
{

    media: {
        height: 200, // 16:9,
        objectFit: "contain",
    }
};

const Products = ({ category }) => {


    const { products, isLoading } = useAPI();

    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
    
    var count = Math.ceil(products.length / PER_PAGE);
    var _DATA = usePagination(products, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const renderProduct = (product, index) => {
        return <div key={index} className="col-6">
            <Card
                onClick={e => Router.push('/[category]/[id]', `/${(product.category).replace(/ /g, "_")}/${product.id}`)} sx={{ maxWidth: 345, margin: "1em" }}>
                <CardMedia
                    component="img"

                    height="200"
                    max-width=" 100%"
                    image={product.image}
                    alt="green iguana"
                    style={styles.media}
                />
                <CardContent style={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Rating name="read-only" value={product.rating.rate} readOnly />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    }
    return (
        <>

            {!isLoading ?
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={0} md={2}>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <div class="container">
                                <div className="row" style={{ marginTop: "5em" }}>
                                    <Pagination
                                        count={count}
                                        size="large"
                                        page={page}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleChange}
                                    />
                                    {_DATA.currentData().map((product, index) => {
                                        console.log(category, "==", (product.category).replace(/ /g, "_"))
                                        if ((product.category).replace(/ /g, "_") == category) {
                                            console.log(true)
                                            return renderProduct(product, index)
                                        }
                                        else if (category == "/") {
                                            return renderProduct(product, index)
                                        }
                                    })
                                    }
                                    <Pagination
                                        count={count}
                                        size="large"
                                        page={page}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={0} md={2}>
                        </Grid>
                    </Grid>
                </Box>
                :
                <div style={{ textAlign: "center", margin: "2em" }}>
                    <div>
                        <Box> <CircularProgress /> </Box>
                    </div>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        component="div">Loading...</Typography>
                </div>
            }



        </>
    )
}
export default Products;
