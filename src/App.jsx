import Home from "./Home.jsx";
import QrDownload from "./QrDownload.jsx";
import { useState } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [pageType, setPageType] = useState("home");

  function SelectedPage() {
    if (pageType == "qrdownload") {
      return <QrDownload />;
    }
    return <Home />;
  }

  const goToTop = () => {
    window.location.reload(); // old way to reset the page
  }

  const okinawaClick = () => {
    window.open("https://docs.google.com/spreadsheets/d/1Eb1IRArcai5KaRhj3CaYIqForxfFifN4R5I91oXtgdo/", "_blank");
  }

  const qrClick = () => {
    console.log("qrClick clicked");
    setPageType("qrdownload");
  }

  return (
    <Box>
      <img src="/okinawa_flag.svg" alt="Okinawa flag" width="30%" onClick={goToTop} />
      <h1><span className="red" onClick={okinawaClick}>Okinawa</span><span onClick={qrClick}> QR</span> Entry<span className="red"> System</span></h1>

      <SelectedPage />
    </Box>
  );
};

export default App;
