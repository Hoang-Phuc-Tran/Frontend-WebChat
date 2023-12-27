import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDraw/PopularChannel";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import ExploreServers from "../components/Main/ExploreServers";
import { GlobalStyles } from "@mui/material";

const Home = () => {
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDraw>
          <PopularChannels open={false} />
        </PrimaryDraw>
        <SecondaryDraw>
          <ExploreCategories />
        </SecondaryDraw>
        <Main>
          <ExploreServers />
        </Main>
      </Box>
    </>
  );
};
export default Home;
