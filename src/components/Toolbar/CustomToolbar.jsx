import FilterList from "@mui/icons-material/FilterList";
import { Alert, DialogContent, DialogActions, Dialog, useMediaQuery, Box } from "@mui/material";

// import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import "assets/css/toolbar.css";
import Accordion from "components/Accordion/Accordion.jsx";
import CustomDialog from "components/Dialog/CustomDialog";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/ToolbarNavPills.jsx";
import { ThemeContext2 } from "contexts/ColorContext.js";
import json2mq from "json2mq";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
// import { withStyles } from "@mui/styles";
import ReactDOM from "react-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import theme from "assets/theme";
import { useMaterialUIController } from "context";
let prev = -1;
let proceed = false;

export default function MyComponent(props) {
  const user = useContext(ThemeContext2);
  const [setKey, fSet] = useState(0);
  const handleIncrement = (key) => fSet(key);

  if (prev !== props.proceed) {
    proceed = true;
    prev = props.proceed;
  } else {
    proceed = false;
  }

  let mafuta = "yellow";
  let theState = false;
  const matches = useMediaQuery(
    json2mq({
      minWidth: 960,
    })
  );

  if (`${matches}` === "true") {
    mafuta = "blue";
    theState = true;
  } else {
    mafuta = "yellow";
    theState = false;
  }

  return (
    <LecturerClass
      theme={user}
      setKey={setKey}
      handleIncrement={handleIncrement}
      proceed={proceed}
      slideNo={props.slideNo}
      key={theState + props.proceed}
      theState={theState}
      toolbarData={props.toolbarData}
      controlDialog={props.controlDialog}
      rightIconColor={props.rightIconColor}
    />
  );
}

class LoopClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const toolBarData = [];
    this.props.toolbarData.forEach((data, dataIndexIndex) => {
      if (dataIndexIndex !== 0) {
        toolBarData.push(
          <MDBox
            sx={{
              width: "200px",
              position: "relative",
              padding: "5px",
              float: "left",
            }}
          >
            {data}
          </MDBox>
        );
      }
    });

    return (
      <MDBox style={{ width: "0%" }}>
        <MDBox
          style={{
            width: "100%",
            position: "relative",
            margin: "auto",
            display: this.props.handleIncrement,
          }}
        >
          {toolBarData}
        </MDBox>
      </MDBox>
    );
  }
}

class LoopClassMass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const toolBarData = [];
    toolBarData.push(
      <MDBox
        key={1}
        style={{
          width: "100%",
          float: "left",
          padding: "5px",
        }}
      >
        {this.props.toolbarData}
      </MDBox>
    );

    return (
      <MDBox style={{ position: "relative", display: this.props.theState }}>{toolBarData}</MDBox>
    );
  }
}

class FilterDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreDetailShow: false,
      selected: "",
    };
  }
  componentDidMount() {
    if (this.props.controlDialog === false) {
      if (this.state.moreDetailShow === true) {
        this.setState({ moreDetailShow: false });
      }
    }
  }

  isActive(value) {
    return value === this.state.selected ? "activeTool" : "defaultTool";
  }

  handleBudgetLines() {
    this.setState({ moreDetailShow: true, selected: "" });
  }

  setFilter(filter) {
    this.setState({ selected: filter });
  }

  handleClickClose = () => {
    this.setState({
      moreDetailShow: false,
    });
  };

  getFilterTittle = () => {
    const fTitle = this.props.filterTitle ?? null;
    if (fTitle !== null) {
      return fTitle;
    }
    return "Select through the different Options. Data may automatically load or require you click on the filter button.";
  };

  render() {
    const toolBarData = [];
    const filters = [];
    if (this.props.toolbarData !== undefined) {
      this.props.toolbarData.forEach((data, dataIndexIndex) => {
        toolBarData.push(
          <MDBox p={1}>
            <MDButton
              variant="text"
              color={data?.rightIconColor ?? "primary"}
              onClick={data?.rightIconFunction}
              key={dataIndexIndex}
              size="large"
              // onClick={this.setFilter.bind(this, data.hint)}
            >
              {data.icon}&nbsp;
              {data.hint}
            </MDButton>
          </MDBox>
        );
      });
    }

    if (this.props.filters !== undefined) {
      this.props.filters.forEach((data, index) => {
        filters.push(
          <MDBox
            key={index}
            style={{
              textAlign: "center",
              marginLeft: "15px",
              textTransform: "uppercase",
            }}
          >
            {data}
          </MDBox>
        );
      });
    }

    return (
      <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {filters.length !== 0 && (
          <MDBox p={1}>
            <MDButton
              variant="text"
              color="primary"
              size="large"
              onClick={(event) => this.handleBudgetLines(event)}
            >
              <FilterList /> &nbsp;Filter Data
            </MDButton>
          </MDBox>
        )}
        {toolBarData}

        {this.state.moreDetailShow && (
          <CustomDialog
            maxWidth="md"
            // ZIndex={12000}
            scroll="body"
            titleBGColor={"primary"}
            noticeModal={this.state.moreDetailShow}
            handleClose={this.handleClickClose}
            title={
              <MDBox style={{ textTransform: "uppercase" }}>
                <FilterList fontSize="large" />
                &nbsp; Filter Data
              </MDBox>
            }
            content={
              <>
                <Alert severity="info">{this.getFilterTittle()}</Alert>
                {filters}
              </>
            }
          />
        )}
      </MDBox>
    );
  }
}

class LoopClassRight2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreDetailShow: false,
      selected: "",
    };
  }
  componentDidMount() {
    //alert(this.props.controlDialog)
    if (this.props.controlDialog === false) {
      if (this.state.moreDetailShow === true) {
        this.setState({ moreDetailShow: false });
      }
    }
  }

  isActive(value) {
    return value === this.state.selected ? "activeTool" : "defaultTool";
  }

  handleBudgetLines() {
    this.setState({ moreDetailShow: true, selected: "" });
  }

  setFilter(filter) {
    this.setState({ selected: filter });
  }

  handleClickClose = () => {
    this.setState({
      moreDetailShow: false,
    });
  };

  render() {
    const toolBarData = [];
    const filters = [];
    if (this.props.toolbarData !== undefined) {
      this.props.toolbarData.forEach((data, dataIndexIndex) => {
        toolBarData.push(
          <MDButton
            key={dataIndexIndex}
            // color="transparent"
            // className={this.isActive(data.hint)}
            onClick={this.setFilter.bind(this, data.hint)}
            color={this.props.rightIconColor}
          >
            {data.icon}
            {data.hint}
          </MDButton>
        );
      });
    }

    if (this.props.filters !== undefined) {
      this.props.filters.forEach((data, dataIndexIndex) => {
        filters.push(
          <MDBox
            key={dataIndexIndex}
            style={{
              textAlign: "center",
              marginLeft: "15px",
              textTransform: "uppercase",
            }}
          >
            {data}
          </MDBox>
        );
      });
    }

    return (
      <MDBox
        style={{
          display: "flex",
          background: theme.palette.background.default,
        }}
      >
        {filters.length !== 0 ? (
          <MDButton
            color="primary"
            className={this.isActive("")}
            sx={{
              textAlign: "center",
              cursor: "pointer",
              textTransform: "uppercase",
              background: "#344767",
            }}
            onClick={(event) => this.handleBudgetLines(event)}
          >
            <FilterList />
            <b>Filter Data</b>
          </MDButton>
        ) : null}
        {toolBarData}
        <Dialog
          fullWidth
          open={this.state.moreDetailShow}
          keepMounted
          onClose={this.handleClickClose}
        >
          <DialogContent>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                {filters}
              </GridItem>
            </GridContainer>
          </DialogContent>

          <DialogActions>
            <MDButton onClick={this.handleClickClose} color="error" variant="text">
              Close
            </MDButton>
          </DialogActions>
        </Dialog>
      </MDBox>
    );
  }
}

function LecturerClass({
  propX,
  propY,
  onStop,
  onMove,
  gridX,
  gridY,
  theState,
  handleIncrement,
  toolbarData,
  controlDialog,
  rightIconColor,
}) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     openmenu: false,
  //     slideNo: 0,
  //     relX: 0,
  //     relY: 0,
  //     x: localStorage.getItem("xAxis") ? parseInt(localStorage.getItem("xAxis")) : props.x ?? 0,
  //     y: localStorage.getItem("yAxis") ? parseInt(localStorage.getItem("yAxis")) : props.y ?? 0,
  //   };
  //   // this.anchorRef = React.createRef();
  //   this.gridX = props.gridX || 1;
  //   this.gridY = props.gridY || 1;
  //   this.onMouseDown = this.onMouseDown.bind(this);
  //   this.onMouseMove = this.onMouseMove.bind(this);
  //   this.onMouseUp = this.onMouseUp.bind(this);
  //   this.onTouchStart = this.onTouchStart.bind(this);
  //   this.onTouchMove = this.onTouchMove.bind(this);
  //   this.onTouchEnd = this.onTouchEnd.bind(this);
  // }

  const [x, setX] = useState(
    localStorage.getItem("xAxis") ? parseInt(localStorage.getItem("xAxis")) : propX ?? 0
  );
  const [y, setY] = useState(
    localStorage.getItem("yAxis") ? parseInt(localStorage.getItem("yAxis")) : propY ?? 0
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [slideNo, setSlideNo] = useState(0);
  const [relX, setRelX] = useState(0);
  const [relY, setRelY] = useState(0);

  function onStart(e) {
    const ref = ReactDOM.findDOMNode(this.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    setRelX(e.pageX - (box.left + body.scrollLeft - body.clientLeft));
    setRelY(e.pageY - (box.top + body.scrollTop - body.clientTop));
    // this.setState({
    //   relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
    //   relY: e.pageY - (box.top + body.scrollTop - body.clientTop),
    // });
  }

  function onMove(e) {
    const xTemp = Math.trunc((e.pageX - relX) / gridX) * gridX;
    const yTemp = Math.trunc((e.pageY - relY) / gridY) * gridY;
    if (xTemp !== x || yTemp !== y) {
      setX(xTemp);
      setY(yTemp);
      // this.setState({
      //   x,
      //   y,
      // });
      localStorage.setItem("xAxis", xTemp);
      localStorage.setItem("yAxis", yTemp);
      onMove && onMove(x, y);
    }
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    onStart(e);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  }

  function onMouseUp(e) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    onStop && onStop(x, y);
    e.preventDefault();
  }

  function onMouseMove(e) {
    onMove(e);
    e.preventDefault();
  }

  function onTouchStart(e) {
    // this.setState({ openmenu: true });
    setOpenMenu(true);
    onStart(e.touches[0]);
    document.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", onTouchEnd, { passive: false });
    e.preventDefault();
  }

  function onTouchMove(e) {
    onMove(e.touches[0]);
    e.preventDefault();
  }

  function onTouchEnd(e) {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
    onStop && onStop(x, y);
    e.preventDefault();
  }

  function setKey(key) {
    handleIncrement(key);
    //setKey=key
  }

  function drawContent(data) {
    for (var i = 1; i < 5; i++) {
      //return "Date Not Set";
      return (
        <MDBox key={i} style={{ width: "auto", padding: "5px", position: "relative" }}>
          {data[i]}
        </MDBox>
      );
    }
  }
  function resetValue() {
    proceed = false;
  }
  function closeMenu() {
    // this.setState({ openmenu: false });
    setOpenMenu(false);
  }
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const display = theState ? "flex" : "inlineBlock";
  const width = theState ? "auto" : "100%";
  const toolBarData = [];

  const collapses = [];
  // console.log("theme.palette.mode=> ", theme.palette);

  toolbarData?.forEach((data, dataIndexIndex) => {
    toolBarData.push({
      tabButton: data.Title,
      tabContent: (
        <MDBox
          key={dataIndexIndex}
          sx={({ palette: { background } }) => ({
            // background: darkMode && !state && background.card,
            background: darkMode ? background.card : background.paper,
            // borderRadius: "20px 0px",
            padding: "0px",
            position: "relative",
            display: display,
            margin: 0,
          })}
          // sx={(theme) => {
          //   background: theme.palette.background.card,
          //   // borderRadius: "20px 0px",
          //   padding: "0px",
          //   position: "relative",
          //   display: theState,
          //   margin: 0,
          // }}
        >
          <Box
            sx={{
              // background: theme.palette.background.paper,
              position: "relative",
              display: display,
              // borderRadius: "20px 0px",
              // display: "flex",
              // backgroundColor: "red",
              float: "left",
            }}
          >
            <LoopClassMass
              theState={theState}
              style={{
                width: "auto",
                padding: "5px",
                display: display,
                position: "relative",
              }}
              toolbarData={data.Content[0]}
              rightIconColor={rightIconColor}
            />
            <LoopClass
              theState={theState}
              style={{
                width: "auto",
                padding: "5px",
                display: display,
                position: "relative",
              }}
              toolbarData={data.Content}
              rightIconColor={rightIconColor}
            />
          </Box>
          <MDBox
            style={{
              // background: theme.palette.dark.main,
              float: "left",
              marginLeft: "auto",
              width: width,
            }}
          >
            <FilterDataComponent
              key={controlDialog}
              controlDialog={controlDialog}
              style={{
                width: "auto",
                padding: "5px",
                float: "left",
                display: "flex",
                position: "relative",
              }}
              filterTitle={data.filterTitle}
              toolbarData={data.RightIcons}
              filters={data.Filters}
            />
          </MDBox>

          {
            //this.drawContent(data.Content)
          }
        </MDBox>
      ),
    });

    collapses.push({
      title: data.Title,
      content: (
        <MDBox
          key={dataIndexIndex}
          onClick={(_) => closeMenu()}
          style={{
            // background: this.props.theme.background,
            padding: "0px",
            position: "relative",
            width: "100%",
          }}
        >
          <MDBox
            style={{
              // background: this.props.theme.background,
              position: "relative",
              display: display,
              float: "left",
            }}
          >
            <LoopClassMass
              theState={theState}
              style={{
                // background: "orange",
                width: "auto",
                padding: "5px",
                display: display,
                position: "relative",
              }}
              toolbarData={data.Content[0]}
            />
            <LoopClass
              theState={theState}
              style={{
                width: "auto",
                padding: "5px",
                display: display,
                position: "relative",
              }}
              toolbarData={data.Content}
            />
          </MDBox>
          <MDBox
            style={{
              // background: this.props.theme.background,
              float: "left",
              marginLeft: "auto",
              width: width,
            }}
          >
            <MDBox
              style={{
                borderBottom: "1px solid #CCC",
                color: "#CCC",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              Actions
            </MDBox>

            <LoopClassRight2
              key={controlDialog}
              controlDialog={controlDialog}
              style={{
                width: "auto",
                padding: "5px",
                float: "left",
                display: "flex",
                position: "relative",
                marginLeft: "20px",
              }}
              toolbarData={data.RightIcons}
              filters={data.Filters}
              rightIconColor={rightIconColor}
            />
          </MDBox>

          {
            //this.drawContent(data.Content)
          }
        </MDBox>
      ),
    });
  });

  return (
    <MDBox style={{ marginTop: "5px", marginBottom: "10px" }}>
      {/* {theState ? ( */}
      <NavPills
        setKeyk={setKey}
        setKey={handleIncrement}
        resetValue={resetValue}
        slideNo={slideNo}
        color="primary"
        alignRight
        proceed={proceed}
        tabs={toolBarData}
      />

      <Dialog
        fullWidth="true"
        maxWidth={"md"}
        // contentStyle={{
        //   width: "50%",
        //   maxWidth: "none",
        // }}
        open={openMenu}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Accordion active={0} collapses={collapses} />
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenMenu(false)}>Close</MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

LecturerClass.propTypes = {
  onMove: PropTypes.func,
  onStop: PropTypes.func,
  gridX: PropTypes.number,
  gridY: PropTypes.number,
};

LecturerClass.propTypes = {
  onMove: PropTypes.func,
  onStop: PropTypes.func,
  proceed: PropTypes.number,
  slideNo: PropTypes.number,
  handleIncrement: PropTypes.func,
  propX: PropTypes.number.isRequired,
  propY: PropTypes.number.isRequired,
  gridX: PropTypes.number,
  gridY: PropTypes.number,
  theState: PropTypes.bool.isRequired,
  toolbarData: PropTypes.arrayOf(PropTypes.any).isRequired,
  controlDialog: PropTypes.bool.isRequired,
  rightIconColor: PropTypes.string.isRequired,
};

//  withStyles(extendedFormsStyle)(MyComponent);
