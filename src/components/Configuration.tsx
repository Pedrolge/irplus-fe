import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopy';
import {Title, fetchUtils} from 'react-admin';
import Table from '@material-ui/core/Table';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import simpleDataProvider from "../services/irplus-service";
import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';


const useStyles = makeStyles((theme: Theme) => {return {
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    textField: {
      width: "100%"
    },
    card: {
        marginTop: 50,
        paddingTop: 40,
        paddingBottom: 40,
        paddingRight: 20,
        paddingLeft: 20,
    }
}});

interface IApiKey {
    token_name: string,
    prefix: string,
}

const Configuration = () => {
    const classes = useStyles();

    const {keycloak} = useKeycloak()
    const [apiKeys, setApiKeys] = useState<IApiKey[]>([])
    const [token, setToken] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [tokenName, setTokenName] = React.useState("");
    const handleTokenChange = (event: any) => setTokenName(event.target.value);


    useEffect(() => {
        function getApiKeys() {
            dataProvider.getList("token", {pagination: {page: 0, perPage: 0}, filter: {}, sort: {field: "", order: ""}})
                .then((result) => {
                    setApiKeys(result.data.map((item: any) => {
                        const token: IApiKey = {token_name: item.token_name, prefix: item.prefix}
                        return token;
                    }))
                    console.log(result)
                })
        }
        getApiKeys();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const handleCreate = () => {
        if (tokenName !== "") {
            dataProvider.create("token", {data: tokenName})
                .then((result) => {
                    console.log(result)
                    setApiKeys(apiKeys.concat({
                        token_name: result.data.token_name,
                        prefix: result.data.prefix
                    }))
                    setToken(result.data.token)
                    setOpen(true);
                })
        }

        console.log("Create new api key")
    }

    const handleDelete = (name: string) => () => {
        console.log(`Deleting api key ${name}`)
        dataProvider.delete("token", {id: name, previousData: {id: name}})
            .then((result) => {
                setApiKeys(apiKeys.filter((token: IApiKey) => token.token_name !== name))
                console.log(result)
            })
    }


    const httpClient = (url: string, options: any = {}) => {
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers.set('Authorization', `Bearer ${keycloak.token}`);
        return fetchUtils.fetchJson(url, options);
    };
    const dataProvider = simpleDataProvider('http://localhost:3000/api', httpClient);

    return (
        <Grid container>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <Card className={classes.card}>
                    <Title title="Settings"/>

                    <CardContent>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={2}/>
                            <Grid item xs={5}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Api Key Name"
                                    type="text"
                                    value={tokenName}
                                    onChange={handleTokenChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="contained" onClick={handleCreate}>New</Button>
                            </Grid>
                            <Grid item xs={2}/>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Api Key</TableCell>
                                    <TableCell align="right">Prefix</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apiKeys.map((row) => (
                                    <TableRow key={row.token_name}>
                                        <TableCell component="th" scope="row">{row.token_name}</TableCell>
                                        <TableCell align="right">{row.prefix}</TableCell>
                                        <TableCell align="right"><Button variant="contained"
                                                                         onClick={handleDelete(row.token_name)}><DeleteIcon/></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Api Key</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Use the following api key to make requests to the server. Make sure to save the key
                                    in a secure place. You will not be able to see it again!

                                    <Grid container>
                                        <Grid item  xs={9}>
                                            <TextField className={classes.textField} disabled label={"Api Key"} defaultValue={token}/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CopyToClipboard text={token}>
                                                <Button>
                                                    <FileCopy/>
                                                </Button>

                                            </CopyToClipboard>
                                        </Grid>
                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Understood
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}/>
        </Grid>
        );
}

export default Configuration