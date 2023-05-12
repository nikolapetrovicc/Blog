import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import React from "react";

export const ChipGender = ({ gender }: any) => (
  <Box>
    {gender === "Male" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #237804",
          backgroundColor: "#f6ffed",
          color: "#237804",
        }}
      />
    )}
    {gender === "Female" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #a8071a",
          backgroundColor: "#fff1f0",
          color: "#a8071a",
        }}
      />
    )}
    {gender === "Agender" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #6C5DD3",
          backgroundColor: "#f1efff",
          color: "#6C5DD3",
        }}
      />
    )}
    {gender === "Non-binary" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #FFCE73",
          backgroundColor: "#fffaf2",
          color: "#FFCE73",
        }}
      />
    )}
    {gender === "Polygender" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #FFA2C0",
          backgroundColor: "#fff1f5",
          color: "#FFA2C0",
        }}
      />
    )}
    {gender === "Genderfluid" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #b05dd3",
          backgroundColor: "#faefff",
          color: "#b05dd3",
        }}
      />
    )}
    {gender === "Bigender" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #A0D7E7",
          backgroundColor: "#eefbff",
          color: "#A0D7E7",
        }}
      />
    )}
    {gender === "Genderqueer" && (
      <Chip
        label={gender}
        sx={{
          border: "2px solid #EC4E2C",
          backgroundColor: "#fff3f0",
          color: "#EC4E2C",
        }}
      />
    )}
  </Box>
);
export default ChipGender;
