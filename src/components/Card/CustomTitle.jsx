import { makeStyles } from "@mui/styles";
import AccountIcon from "@mui/icons-material/AccountBox";
import PropTypes from "prop-types";
import React from "react";

const CustomTitle = ({ ...props }) => {
  const { title, firstColor, lastColor, icon, centerTitle, color, ...rest } =
    props;
  const isCentered = centerTitle ?? true;

  const useStyles = makeStyles((theme) => ({
    cardBG: {
      margin: "-15px -20px 15px -20px",
      boxShadow: "1px 2px 20px #aaaaaa",
      display: "flex",
      color: color ?? "white",
      fontSize: "1.25rem",
      background: `linear-gradient(45deg, ${firstColor ?? "#FF9800"} 90%, ${
        lastColor ?? "#5A5A5A"
      } 10%)`,
    },
    cardTitle: {
      margin: "auto",
      padding: "10px",
      textAlign: isCentered ? "center" : "left",
    },
    iconStyles: {
      padding: "10px",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.cardBG} {...rest}>
      <strong className={classes.cardTitle}>{title}</strong>
      <span className={classes.iconStyles}>
        {icon ?? <AccountIcon fontSize="large" />}
      </span>
    </div>
  );
};

CustomTitle.propTypes = {
  title: PropTypes.object.isRequired,
  centerTitle: PropTypes.bool,
};

export default CustomTitle;
