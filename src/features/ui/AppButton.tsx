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
  component?: React.ElementType;
  href?: string;
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
      component={component}
      href={href}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      endIcon={endIcon}
      startIcon={startIcon}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        height: { xs: 48, md: 56 },
        textTransform: "none",
        ...sx,
      }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </Button>
  );
}
