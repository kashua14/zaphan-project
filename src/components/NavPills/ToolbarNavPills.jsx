import React, { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { Grid, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ThemeContext2 } from "contexts/ColorContext.js";
import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
} from "assets/jss/material-dashboard-pro-react.jsx";
import MDBox from "components/MDBox";

export default function Card2(props) {
  const user = useContext(ThemeContext2);

  const navPillsStyle = makeStyles((theme) => ({
    root: {
      marginTop: "2px",
      paddingLeft: "0",
      marginBottom: "0",
      overflow: "visible !important",
    },
    flexContainer: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    displayNone: {
      display: "none !important",
    },
    fixed: {
      overflowX: "visible",
    },
    horizontalDisplay: {
      display: "block",
    },
    pills: {
      float: "left",
      position: "relative",
      display: "block",
      minWidth: "100px",
      textAlign: "center",
      transition: "all .3s",
      padding: "1px 1px",
      color: "#555555",
      height: "auto",
      opacity: "1",
      maxWidth: "100%",
      margin: "0 5px",
    },
    pillsWithIcons: {
      borderRadius: "4px",
    },
    tabIcon: {
      width: "30px",
      height: "30px",
      display: "block",
      margin: "0px 0",
    },
    horizontalPills: {
      width: "100%",
      float: "none !important",
      "& + button": {
        margin: "2px 0",
      },
    },
    labelContainer: {
      padding: "0!important",
      color: "inherit",
    },
    label: {
      lineHeight: "24px",
      textTransform: "uppercase",
      fontSize: "12px",
      fontWeight: "500",
      position: "relative",
      display: "block",
      color: "inherit",
    },
    contentWrapper: {
      marginTop: "2px",
    },
    primary: {
      "&,&:hover,&:focus": {
        color: primaryColor,
        outline: "0",
        background: user.background,
      },
    },
    info: {
      "&,&:hover": {
        color: "#FFFFFF",
        backgroundColor: infoColor,
        boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)",
      },
    },
    success: {
      "&,&:hover": {
        color: "#FFFFFF",
        backgroundColor: successColor,
        boxShadow:
          "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
      },
    },
    warning: {
      "&,&:hover": {
        color: "#FFFFFF",
        backgroundColor: warningColor,
        boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
      },
    },
    danger: {
      "&,&:hover": {
        color: "#FFFFFF",
        backgroundColor: dangerColor,
        boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)",
      },
    },
    rose: {
      "&,&:hover": {
        color: "#FFFFFF",
        backgroundColor: roseColor,
        boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)",
      },
    },
    alignCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const classes = navPillsStyle();

  return <NavPills classes={classes} key={user.background} {...props} />;
}

let proceed = false;
class NavPills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.slideNo !== undefined ? props.slideNo : this.props.setKeyk,
      proceed: false,
    };
  }

  componentDidMount() {
    proceed = this.props.proceed;
    this.props.resetValue();
  }

  lazyGuys(key) {
    if (this.props.slideNo !== undefined) {
    } else {
      this.props.setKey(key);
      proceed = false;
      if (this.props.setKeyk !== 0 && this.props.proceed && proceed) {
        this.setState({ active: key, proceed: false });
      }
    }
  }

  handleChange = (_, active) => {
    if (this.props.slideNo !== undefined) {
      proceed = false;
    }
    if (proceed && this.props.slideNo !== undefined) {
      this.setState({ active });
    }
  };

  handleChangeIndex = (index) => {
    this.setState({ active: index });
  };

  render() {
    const { classes, tabs, direction, color, horizontal, alignCenter } = this.props;
    const flexContainerClasses = classNames({
      [classes.flexContainer]: true,
      [classes.horizontalDisplay]: horizontal !== undefined,
    });
    const tabButtons = (
      <Tabs
        style={{
          marginBottom: "-5px",
          borderRadius: "15px 12px 12px 0",
          zIndex: "10",
        }}
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone,
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={alignCenter}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon !== undefined) {
            icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
          }
          return (
            <Tab
              onClick={() => this.lazyGuys(key)}
              style={{
                marginLeft: "5px",
              }}
              label={prop.tabButton}
              key={key}
              {...icon}
              classes={{ selected: classes[color] }}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <MDBox>
        <SwipeableViews
          axis={direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabs.map((prop, key) => {
            return <MDBox key={key}>{prop.tabContent}</MDBox>;
          })}
        </SwipeableViews>
      </MDBox>
    );
    return horizontal !== undefined ? (
      <Grid container>
        <Grid item {...horizontal.tabsGrid}>
          {tabButtons}
        </Grid>
        <Grid item {...horizontal.contentGrid}>
          {tabContent}
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item>
          {tabButtons}
        </Grid>
        <Grid item xs={12} sm={12} mr={4}>
          {tabContent}
        </Grid>
      </Grid>
    );
  }
}

NavPills.defaultProps = {
  active: 0,
  color: "primary",
};

NavPills.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.func,
      tabContent: PropTypes.node,
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "warning", "danger", "success", "info", "rose"]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object,
  }),
  alignCenter: PropTypes.bool,
};

NavPills.contextType = ThemeContext2;
