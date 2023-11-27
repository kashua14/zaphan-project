
import React, { useContext } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import { ThemeContext2 } from 'contexts/ColorContext.js';
// core components
import cardHeaderStyle from "assets/jss/material-dashboard-react/components/cardHeaderStyle.jsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  ...cardHeaderStyle,
}));
function CardHeader({ ...props }) {
  const classes = useStyles();

  const {
    // classes,
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: "color",
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  const user = useContext(ThemeContext2)
  return (
    <div style={{ background: user.background === 'rgb(37, 37, 37)' ? user.background : props.myColor, color: user.color, boxShadow: user.background === 'rgb(37, 37, 37)' ? [(props.myShadow != undefined ? '5px 5px 25px #000' : null)] : props.myShadow }} className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "white"
  ]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool
};

export default CardHeader;
