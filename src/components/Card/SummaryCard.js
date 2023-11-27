import React from 'react';
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { indigo, blue, cyan, teal, pink } from '@mui/material/colors';
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles((theme) => ({

    content: {
        padding: '16px !important',
    },

    card: {
        overflow: 'hidden',
        position: 'relative',
        transition: 'all .25s linear',
        '&:hover': {
            boxShadow: '3px 5px 6px -1px rgba(3,26,33,0.2) '
        },
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
        height: '95px',

    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: cyan[500],
        color: cyan[50]
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0,
        color: cyan[500]
    }
}));

const ExpectedOrdersCost = ({ cardStatistic }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <List className={classes.padding}>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <ListItemAvatar>
                            <Avatar variant="rounded" className={classes.avatar}>
                                {cardStatistic.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={classes.padding}
                            primary={<Typography variant="h4">
                                {cardStatistic.value}
                            </Typography>}
                            secondary={
                                <Typography variant="subtitle2" className={classes.secondary}>
                                    {cardStatistic.detail}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};

export default ExpectedOrdersCost;
