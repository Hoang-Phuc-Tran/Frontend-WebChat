import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";
import { useParams, useNavigate } from "react-router-dom";
import { Server } from "../@types/server.d";
import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import { GlobalStyles } from "@mui/material";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { dataCRUD, error, fetchData } = useCrud<Server>(
    [],
    `/server/select/?by_serverid=${serverId}`
  );

  if (error !== null && error.message === "400") {
    navigate("/");
    return null;
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Check if the channelId is valid by searching for it in the data fetched from the API
  const isChannel = (): Boolean => {
    if (!channelId) {
      return true;
    }

    return dataCRUD.some((server) =>
      server.channel_server.some((channel) => channel.id === parseInt(channelId))
    );
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);

  return (
    <>
      <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDraw>
          <UserServers open={false} data={dataCRUD} />
        </PrimaryDraw>
        <SecondaryDraw>
          <ServerChannels data={dataCRUD} />
        </SecondaryDraw>
        <Main>
          <GlobalStyles styles={{ body: { overflow: "hidden" } }} />
          <MessageInterface data={dataCRUD} />
        </Main>
      </Box>
    </>
  );
};
export default Server;
