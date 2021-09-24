import Router from 'next/router'
import { useAPI } from '../context/ProvedorProducts'
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Rating } from '@mui/material';
import { CircularProgress } from '@mui/material';
import usePagination from "./Pagination";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Products = ({ category }) => {


    const { products, isLoading } = useAPI();

    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    let count = Math.ceil(products.length / PER_PAGE);
    let _DATA = usePagination(products, PER_PAGE);

    function handleChangePage(e, p, i) {
        setPage(p);
        _DATA.jump(p);
    };

    const renderProduct = (product, index) => {
        return <div key={index} className="col-xs-12 col-sm-6" style={{ padding: "0" }}>
            <Card 
                onClick={e => Router.push('/[category]/[id]', `/${(product.category).replace(/ /g, "_")}/${product.id}`)} sx={{ margin: "1em", minHeight:340}}>
                <CardMedia
                    component="img"

                    height="200"
                    max-width=" 100%"
                    image={product.image}
                    alt="green iguana"
                    style={{ height: 200, objectFit: "contain" }}
                />
                <CardContent style={{ textAlign: "center"}}>
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
                <Box sx={{ flexGrow: 1 }} style={{ marginTop: "5em" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={0} md={2}>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <div className="container">
                                <div className="row">
                                    {category == "/" ?
                                     <Stack spacing={2}>
                                        <Pagination
                                            count={count}
                                            // size="large"
                                            page={page}
                                            variant="outlined"
                                            shape="rounded"
                                            onChange={handleChangePage}
                                        /> </Stack>: <></>
                                    }
                                    {_DATA.currentData().map((product, index) => {
                                        if ((product.category).replace(/ /g, "_") == category) {
                                            return renderProduct(product, index)
                                        }
                                        else if (category == "/") {
                                            return renderProduct(product, index)
                                        }
                                    })
                                    }
                                    {category == "/" ?
                                        <Stack spacing={2}>
                                        <Pagination
                                            count={count}
                                            // size="large"
                                            page={page}
                                            variant="outlined"
                                            shape="rounded"
                                            onChange={handleChangePage}
                                        /></Stack> : <></>
                                    }
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={0} md={2}>
                        </Grid>
                    </Grid>
                </Box>
                :
                <div style={{ textAlign: "center", marginTop: "5em" }}>
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
