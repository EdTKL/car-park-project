import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { Paper } from "@mui/material";
import { useState } from "react";
import './PowerBI.scss'

import React from "react";

const PowerBI = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [report, setReport] = useState();
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "fit-content",
        width: "100%",
        borderRadius: '20px',
      }}
    >
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: "8ebbebc7-4915-4afa-839d-a0a32580eecf",
          embedUrl:
            "https://app.powerbi.com/view?r=eyJrIjoiNjBkOTNhNzYtOTIwOC00ZGUyLWE5YmMtZjM0M2I4MGJmMDdkIiwidCI6ImQxYjY3M2I5LTdjY2QtNDM5Yi04NmJjLWUzNGNjNmM5NTNiYiIsImMiOjEwfQ%3D%3D",
          tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event?.detail);
              },
            ],
            ["visualClicked", () => console.log("visual clicked")],
            ["pageChanged", (event) => console.log(event)],
          ])
        }
        cssClassName={"power-bi"}
        getEmbeddedComponent={(embeddedReport) => {
          setReport(embeddedReport as any);
          // this.report = embeddedReport as unknown as Report;
        }}
      />
    </Paper>
  );
};

export default PowerBI;
