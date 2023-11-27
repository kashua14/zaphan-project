import {
  container,
  cardTitle,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const loginPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  holiday: {
    width:"200px", zIndex:7000, marginTop:"-55px", 
    marginLeft:"-100px", position:"absolute", 
    [theme.breakpoints.down("sm")]: {
      width: "140px",
      marginLeft:"-47px",
    }
  },
  topGuy:{zIndex:10, position:"relative"},
  signature:{zIndex:5, marginTop:"-15px", position:"relative"},
  bottomGuy:{zIndex:5, marginTop:"-10px", position:"relative"},
  holiday2: {
    width:"160px", zIndex:7000, marginTop:"370px", 
      marginLeft:"240px", position:"absolute",
    [theme.breakpoints.down("sm")]: {
      width: "165px",
      marginLeft:"170px",
    }
  },
  mine: {
    zIndex:7000, marginTop:"345px", 
marginLeft:"220px", position:"absolute",
    [theme.breakpoints.down("sm")]: {
      marginLeft:"180px",
    }
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  }
});

export default loginPageStyle;
