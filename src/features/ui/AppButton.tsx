import { type SxProps, type Theme, Typography } from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  loading?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  component?: React.ElementType | undefined; // Explicitly allow undefined
  href?: string | undefined; // Explicitly allow undefined
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth,
  loading,
  component,
  href,
  children,
  endIcon,
  startIcon,
  sx,
  onClick,
}: Props) {
  return (
    <Button
      loading={loading}
      component={component ?? "button"} // Ensure a default value
      href={href ?? ""} // Ensure a default string
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      endIcon={endIcon}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === "text" ? 42 : 48,
          md: variant === "text" ? 48 : 56,
        },
        textTransform: "none",
        width: fullWidth ? "100%" : "fit-content",
        ...sx,
      }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </Button>
  );
}
