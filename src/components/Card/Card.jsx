import React, { useContext,useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
// @material-ui/icons
import  {ThemeContext2}  from 'contexts/ColorContext.js';
// core components
//
import Card from "@mui/material/Card";
import {  makeStyles } from '@mui/styles';
function Card1({ ...props }) {
  const user = useContext(ThemeContext2)
 // cardStyle.card.background=user.background.toString()==="rgb(37, 37, 37)"?"rgb(37, 37, 37)":"#FFF"
  const {
    classes,
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    chart,
    login,
    ...rest
  } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    //[classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [className]: className !== undefined
  });
 // console.log(background);
 const [myValues, setMyValues] = useState(0);

 useEffect(() => {
  setMyValues(Math.random());
 //alert(user.background)
}, [user.background]);

  return (
    <div key={user.background} style={{background:user.background, color:user.color}} className={cardClasses} {...rest} >
     
      {children}
    
    </div>
    
  );
  
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
 // background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool
};


function Card2({ ...props }) {
  const user = useContext(ThemeContext2)
 // cardStyle.card.background=user.background
 const cardStyle = makeStyles(theme => ({
  //const cardStyle = {
  
    card: {
      border: "0",
      marginBottom: "30px",
      marginTop: "30px",
      borderRadius: "6px",
      color: user.color,
     // background:localStorage.getItem('darkMode')?[(localStorage.getItem('darkMode')==="true"?'#000':'#FFF')]:"#fff",
      background:user.background,
      width: "100%",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minWidth: "0",
      wordWrap: "break-word",
      fontSize: ".875rem"
    },
    cardPlain: {
      background: "transparent",
      boxShadow: "none"
    },
    cardProfile: {
      marginTop: "30px",
      textAlign: "center"
    },
    cardBlog: {
      marginTop: "60px"
    },
    cardRaised: {
      boxShadow:
        "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    cardBackground: {
      backgroundPosition: "center center",
      backgroundSize: "cover",
      textAlign: "center",
      "&:after": {
        position: "absolute",
        zIndex: "1",
        width: "100%",
        height: "100%",
        display: "block",
        left: "0",
        top: "0",
        content: '""',
        backgroundColor: "rgba(0, 0, 0, 0.56)",
        borderRadius: "6px"
      },
      "& small": {
        color: "rgba(255, 255, 255, 0.7) !important"
      }
    },
    cardPricing: {
      textAlign: "center",
      "&:after": {
        backgroundColor: "rgba(0, 0, 0, 0.7) !important"
      },
      "& ul": {
        listStyle: "none",
        padding: 0,
        maxWidth: "240px",
        margin: "10px auto"
      },
      "& ul li": {
        color: "#999999",
        textAlign: "center",
        padding: "12px 0px",
        borderBottom: "1px solid rgba(153,153,153,0.3)"
      },
      "& ul li:last-child": {
        border: 0
      },
      "& ul li b": {
        color: "#3c4858"
      },
      "& h1": {
        marginTop: "30px"
      },
      "& h1 small": {
        display: "inline-flex",
        height: 0,
        fontSize: "18px"
      },
      "& h1 small:first-child": {
        position: "relative",
        top: "-17px",
        fontSize: "26px"
      },
      "& ul li svg, & ul li .fab,& ul li .fas,& ul li .far,& ul li .fal,& ul li .material-icons": {
        position: "relative",
        top: "7px"
      }
    },
    cardPricingColor: {
      "& ul li": {
        color: "#fff",
        borderColor: "rgba(255,255,255,0.3)",
        "& b, & svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
          color: "#fff",
          fontWeight: "700"
        }
      }
    },
    cardProduct: {
      marginTop: "30px"
    },
    primary: {
      background: "linear-gradient(60deg,#af1357,#7b1fa2)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    info: {
      background: "linear-gradient(60deg,#26c6da,#0097a7)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    success: {
      background: "linear-gradient(60deg,#66bb6a,#388e3c)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    warning: {
      background: "linear-gradient(60deg,#ffa726,#f57c00)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    danger: {
      background: "linear-gradient(60deg,#ef5350,#d32f2f)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    rose: {
      background: "linear-gradient(60deg,#ec407a,#c2185b)",
      "& h1 small": {
        color: "rgba(255, 255, 255, 0.8)"
      },
      color: "#FFFFFF"
    },
    cardChart: {
      "& p": {
        marginTop: "0px",
        paddingTop: "0px"
      }
    },
    cardLogin: {
      transform: "translate3d(0, 0, 0)",
      transition: "all 300ms linear"
    }
  }));

  const classes = cardStyle();



  return <Card style={{marginTop:"40px"}} classes={classes} key={user.background} {...props }/>
}

export default Card2;
