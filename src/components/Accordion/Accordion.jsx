import React, { useState } from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {withStyles} from "@mui/styles";
import accordionStyle from "assets/jss/material-dashboard-pro-react/components/accordionStyle.jsx";


const CustomAccordion = (props) => {
  const [active, setActive] = useState(props.active);

  const { classes, collapses } = props;

  function handleChange(panel) {
    setActive(panel);
  }
  return (
    <div className={classes?.root}>
      {collapses.map((prop, key) => {
        return (
          <Accordion
            expanded={active === key}
            onChange={() => handleChange(key)}
            key={key}
            classes={{
              root: classes?.expansionPanel,
              expanded: classes?.expansionPanelExpanded,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes?.expansionPanelSummary,
                expanded: classes?.expansionPanelSummaryExpaned,
                content: classes?.expansionPanelSummaryContent,
                expandIcon: classes?.expansionPanelSummaryExpandIcon,
              }}
            >
              <h4 className={classes?.title}>{prop.title}</h4>
            </AccordionSummary>
            <AccordionDetails className={classes?.expansionPanelDetails}>
              {prop.content}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

CustomAccordion.defaultProps = {
  active: -1,
};

CustomAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
  // index of the default active collapse
  active: PropTypes.number,
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.object,
      content: PropTypes.node,
    })
  ).isRequired,
};
// export default CustomAccordion;
export default withStyles(accordionStyle)(CustomAccordion);
