import { enqueueSnackbar } from "notistack";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message = "An unexpected error occurred";

    if (typeof action.payload === "string") {
      message = action.payload;
    } else if (
      typeof action.payload === "object" &&
      action.payload !== null &&
      "data" in action.payload &&
      typeof (action.payload as any).data?.message === "string"
    ) {
      message = (action.payload as any).data.message;
    }

    enqueueSnackbar(message, { variant: "error" });
  }

  return next(action);
};
