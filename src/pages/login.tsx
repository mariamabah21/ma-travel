import { Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import LoginForm from "@features/auth/components/LoginForm";

export default function LogInPage() {
  return (
    <>
      <Typography component="h1" variant="h2" mb={1}>
        Log in
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Login to access {APP_NAME}
      </Typography>
      <LoginForm />
    </>
  );
}
