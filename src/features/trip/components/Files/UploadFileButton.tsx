import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  ButtonBase,
  type SxProps,
  type Theme,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";

interface Props {
  mainText: string;
  subText: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export default function UploadFileButton({
  mainText,
  subText,
  sx,
  onClick,
}: Props) {
  return (
    <Box sx={{ width: "100%", height: "100%", ...sx }} onClick={onClick}>
      <ButtonBase
        sx={{
          bgcolor: Colors.lightGreen,
          display: "flex",
          gap: 1,
          flexDirection: "column",
          color: "primary.main",
          borderRadius: 4,
          height: "100%",
          width: "100%",
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23729E65FF' stroke-width='4' stroke-dasharray='10%2c 20' stroke-dashoffset='96' stroke-linecap='square'/%3e%3c/svg%3e")`,
          px: 1,
        }}
      >
        <AddIcon fontSize="large" />
        <Typography component="span" variant="body2">
          {mainText}
        </Typography>
        <Typography
          component="span"
          color="text.secondary"
          variant="caption"
          sx={{
            // ⬇️ NEW STYLES TO MAKE THE SUBTEXT FIT NICELY
            whiteSpace: "normal", // allow text wrapping instead of cutting
            textAlign: "center", // center the text horizontally
            fontSize: "0.7rem", // slightly smaller text size
            display: "block", // always show the text (even on mobile)
            maxWidth: "100%", // restrict width inside the card
            px: 1, // horizontal padding to prevent text touching edges
          }}
        >
          {subText}
        </Typography>
      </ButtonBase>
    </Box>
  );
}
