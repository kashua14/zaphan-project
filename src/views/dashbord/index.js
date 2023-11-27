// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React components

// Billing page components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// import { useContext } from "react";
// import { CustomAppContext } from "context/MyAppProvider";

function Billing() {
  // const { state: currentUser } = useContext(CustomAppContext);

  // const { userType } = currentUser?.currentUser ?? "TRAINEE";
  const userType = "STAFF";
  const { sales } = reportsLineChartData;

  return (
    <MDBox py={3}>
      {userType === "STAFF" && (
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Today’s Access Logs"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than Yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Total Users"
                  count="95"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="person_add"
                  title="Staff"
                  count="60"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="menu"
                  title="Database Integrations"
                  count="10"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}

      <MDBox mt={6}>
        <Grid container spacing={3}>
          {userType === "STAFF" && (
            <Grid item xs={12} md={4} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Staff Attendance"
                  description={
                    <>
                      than last week (<strong>+30%</strong>).
                    </>
                  }
                  date="Applications"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          )}
          <Grid item xs={12} md={userType === "STAFF" ? 8 : 12} lg={userType === "STAFF" ? 8 : 12}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="Access Logs"
                description={
                  <>
                    (<strong>+15%</strong>) increase in today Access.
                  </>
                }
                date="updated 4 min ago"
                chart={sales}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="dark"
              title="completed tasks"
              description="Last Campaign Performance"
              date="just updated"
              chart={tasks}
            />
          </MDBox>
        </Grid> */}
        </Grid>
      </MDBox>

      {/* <Grid  container>
      <SalesByCountry />
    </Grid> */}

      {/* <MDBox mt={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Projects />
        </Grid>
      </MDBox> */}
    </MDBox>
  );
}

export default Billing;
