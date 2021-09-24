import Router from 'next/router'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//Grid
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const CartProducts = ({ cart, addProductCar, deleteProductsCar, deleteProductCar }) => {

    var suma = 0;
    cart.forEach(function (elemento, indice) {
        suma += elemento["total"];
    });

    //Styles
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }));
    //UseState para mostrar detalle del producto en el carrito
    const [secondary, setSecondary] = useState(false);
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={0} md={2}>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div style={{ margin: "1.5em" }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div">Artículos</Typography>
                        <FormGroup row style={{ margin: "1em" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={secondary}
                                        onChange={(event) => setSecondary(event.target.checked)}
                                    />
                                }
                                label="Ver detalle"
                            />
                        </FormGroup>
                    </div>
                    <Grid item >
                        <div className={classes.demo}>
                            <List>
                                {cart.map((product, index) => {
                                    return <Item key={index} style={{ margin: "1em", paddingBottom: "2.8em" }}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <Avatar src={product.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={product.title}
                                                secondary={secondary ? <><div>{product.quantity + " x $" + product.price.toFixed(2) + " = $" + product.total.toFixed(2)}</div></> : null}
                                            />

                                          <ListItemSecondaryAction style={{ marginTop: "3em" }}>
                                                $ {product.total.toFixed(2)}
                                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                                    deleteProductsCar(product)
                                                }} >

                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                                    deleteProductCar(product)
                                                }}>

                                                    <RemoveIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                                    addProductCar(product)
                                                }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Item>

                                })
                                }
                            </List>
                            <div style={{ textAlign: "right", margin: "1em" }}>
                                <div>
                                    <Typography
                                        variant="subtitle1"
                                        noWrap
                                        component="div">Envio: $ 0.00</Typography></div>
                            </div>
                            <div style={{ textAlign: "right", margin: "1em" }}>
                                <div> <Typography
                                    variant="subtitle1"
                                    noWrap
                                    component="div">Total: $ {suma.toFixed(2)}</Typography></div>
                            </div>
                        </div>
                    </Grid>
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-12" style={{ padding: "0" }}>
                            <div style={{ textAlign: "right" }}>
                                <a style={{
                                    textAlign: "center",
                                    display: "inline-block",
                                    alignItems: " center",
                                    justifyContent: " center",
                                    width: " 50%",
                                    color: " #fff",
                                    background: " #1B241D",
                                    padding: " 1.4em 0",
                                    borderRadius: "0",
                                    transition: " background 0.3s ease",
                                    textDecoration: "none",
                                    lineHeight: "1",
                                    fontSize: " 14px",
                                    fontWeight: "700",
                                    textTransform: " uppercase",
                                    letterSpacing: " 2px"
                                }} onClick={() => Router.push('/')}>Continuar</a>
                            </div>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={0} md={2}>
                </Grid>
            </Grid>
        </Box>
    );
}


export default CartProducts
