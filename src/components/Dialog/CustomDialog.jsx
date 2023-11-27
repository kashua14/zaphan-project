import {
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

export default function CustomDialog(props) {
  const {
    content,
    title,
    color,
    maxWidth,
    titleBGColor,
    noticeModal,
    handleClose,
    ZIndex,
    scroll,
    dialogFooter,
    hideCloseBtn,
    fullScreen,
    ...rest
  } = props;
  let titleBGColorTemp = titleBGColor;
  switch (titleBGColor) {
    case "info":
      titleBGColorTemp = "#1A73E8";
      break;
    case "success":
      titleBGColorTemp = "#4CAF50";
      break;
    case "danger":
    case "error":
      titleBGColorTemp = "#F44336";
      break;
    case "warning":
      titleBGColorTemp = "#FF9800";
      break;
    case "primary":
      titleBGColorTemp = "#B5004F";
      break;
    default:
  }

  let colorPercent = "87%";

  if (maxWidth === "xs" || maxWidth === "sm") {
    colorPercent = "80%";
  }

  const materialTheme = createTheme({
    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: "1.25rem",
            fontWeight: "normal",
            lineHeight: 1.6,
            color: color ?? "white",
            padding: "16px 24px !important",
            background: `linear-gradient(45deg, ${
              titleBGColorTemp ?? "#FF9800"
            } ${colorPercent}, #5A5A5A 10%)`,
          },
        },
      },
    },
  });

  return (
    <Dialog
      maxWidth={maxWidth ?? "sm"}
      fullWidth
      scroll={scroll ?? "paper"}
      open={noticeModal}
      style={{ zIndex: ZIndex ?? 1200 }}
      onClose={handleClose}
      fullScreen={fullScreen}
      {...rest}
    >
      <ThemeProvider theme={materialTheme}>
        <DialogTitle>
          <Grid
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {title}
            <MDTypography>
              <CloseIcon
                fontSize="large"
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleClose}
              />
            </MDTypography>
          </Grid>
        </DialogTitle>
      </ThemeProvider>
      <DialogContent>{content}</DialogContent>
      {dialogFooter !== undefined && (
       
          <MDBox p={3} mt={2} width="100%" display="flex" justifyContent="space-between">
          {!hideCloseBtn ? (
            <MDButton onClick={handleClose} variant="outlined"  color="dark" title="Close this dialog.">
              Close
            </MDButton>
          ) : (
            <p />
          )}
          {dialogFooter}
          </MDBox>
       
      )}
    </Dialog>
  );
}

// Setting default props for the Header
CustomDialog.defaultProps = {
  hideCloseBtn: false,
  fullScreen: false,
  noticeModal: false,
  maxWidth: "sm",
  color: "white",
  ZIndex: 1200,
  scroll: "paper",
  titleBGColor: "info",
};

// Typechecking props for the Header
CustomDialog.propTypes = {
  content: PropTypes.node.isRequired,
  dialogFooter: PropTypes.node.isRequired,
  fullScreen: PropTypes.bool,
  noticeModal: PropTypes.bool,
  hideCloseBtn: PropTypes.bool,
  title: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  color: PropTypes.string,
  ZIndex: PropTypes.number,
  scroll: PropTypes.string,
  titleBGColor: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};
