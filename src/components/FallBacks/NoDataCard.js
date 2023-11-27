import React from 'react';
import Lottie from 'react-lottie';
import { Grid, useMediaQuery, useTheme, Typography } from '@mui/material';

import notFound from "assets/img/DashboardMedia/no_found1.jpg"
import congratsLottie from 'assets/animations/General/no-result-found.json'

const NoDataCard = ({ title }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {

    }, [])

    const noDataCardLottie = {
        loop: true,
        autoplay: true,
        animationData: congratsLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <React.Fragment>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction='column'
            >
                <Grid item md={12} >
                    {!matchDownSM ?
                        < Lottie options={noDataCardLottie}
                            height={150}
                        />
                        : <img
                            src={notFound}
                            style={{ width: "150px" }}
                            alt = 'fallback'
                        />
                    }
                </Grid>

                <Grid item md={12} >
                    <Typography variant="body2" style={{ textAlign: "center", color: "#bdbdbd" }} component="p">
                        {title ?? "NO DATA FOUND"}
                    </Typography>

                </Grid>

            </Grid>

        </React.Fragment>

    );
};

export default NoDataCard;
