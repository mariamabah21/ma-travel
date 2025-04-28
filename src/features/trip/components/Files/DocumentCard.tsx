import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  url?: string | null;
  onRemoveClick: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
}
export default function DocumentCard({
  name,
  url,
  onRemoveClick,
  uploadProgress,
  isRemoving,
}: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        border: 1,
        borderRadius: 4,
        borderColor: "grey.200",
        width: { xs: 170, md: 200 },
        height: "100%",
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: "absolute",
            top: "calc(50%-1.25rem)",
            left: "calc(50%-1.25rem)",
          }}
        />
      )}
      <IconButton
        onClick={onRemoveClick}
        aria-label="remove photo"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: "fit-content",
          opacity: uploadProgress ? 0.2 : 1,
        }}
        disabled={isRemoving}
      >
        {isRemoving ? <CircularProgress size={24} /> : <CloseIcon />}
      </IconButton>
      <Stack
        href={isRemoving ? "" : (url ?? "#")}
        component={Link}
        target={isRemoving ? "_self" : "_blank"}
        rel="noopener noreferrer"
        gap={2}
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
          pt: 6,
          textDecoration: "none",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        DocumentCard
        <Stack gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: { xs: 148, md: 133 },
              bgColor: "grey.100",
              borderRadius: 4,
            }}
          >
            <InsertDriveFileIcon
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-line-clamp": "1",
                "line-clamp": "1",
                "-webkit-box-orient": "vertical",
              }}
            />
          </Stack>
          <Typography
            color="text.primary"
            sx={{
              fontSize: "0.75rem", // smaller text
              textAlign: "center", // center the text
              wordBreak: "break-word", // allow breaking long words
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // ⬅️ LIMIT TO 2 LINES
              WebkitBoxOrient: "vertical",
              height: "2.4em", // ⬅️ reserve space for 2 lines
              lineHeight: "1.2em",
            }}
          >
            {" "}
            {name}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
