// Material Dashboard 2 PRO React base styles
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import colors from "assets/theme-dark/base/colors";

const { borderRadius } = borders;
const { background } = colors;
const { xxl } = boxShadows;

const dialog = {
  styleOverrides: {
    paper: {
      backgroundColor: background.card,
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
};

export default dialog;
