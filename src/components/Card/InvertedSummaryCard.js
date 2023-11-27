import React from 'react';
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { indigo, blue, cyan, teal, pink } from '@mui/material/colors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: cyan[400],
        color: cyan[100],
        overflow: 'hidden',
        position: 'relative',
        transition: 'all .25s linear',
        '&:hover': {
            boxShadow: '3px 5px 6px -1px rgba(3,26,33,0.2) '
        },
        height: '92px',

        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(210.04deg, #078191 -50.94%, rgba(144, 202, 249, 0) 83.49%)',
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: 'linear-gradient(140.9deg, #6ce0f0 -14.02%, rgba(144, 202, 249, 0) 77.58%)',
            borderRadius: '50%',
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: cyan[300],
        color: cyan[50]
    },
    primary: {
        color: cyan[50]
    },
    secondary: {
        color: cyan[100],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const ExpectedOrders = ({ cardStatistic }) => {
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
                            primary={
                                <Typography variant="h4" className={classes.primary}>
                                    {cardStatistic.value}
                                </Typography>
                            }
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

export default ExpectedOrders;
