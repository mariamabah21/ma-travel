import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ButtonBase, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import PreviewImageDialog from "@features/trip/components/PreviewImageDialog";
import DateSelectInput from "@features/ui/form/DateSelectInput";
import useDialog from "@hooks/useDialog";

import Pagination from "../Navigation/Pagination";

interface FormInput {
  name: string;
  previewImage: string | null;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}
export default function LoginForm() {
  const { isOpen, open, close } = useDialog();
  const { handleSubmit, control, onSubmit, formValues } = useTravelInfoForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <ButtonBase
          onClick={open}
          sx={{
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 0.5,
            height: 152,
            minWidth: { xs: "100%", md: 152 },
            border: 1,
            borderColor: "text.secondary",
          }}
        >
          <ImageSearchIcon sx={{ color: Colors.disabled }} />
          <Typography variant="subtitle1" color={Colors.disabled}>
            {" "}
            Preview Image{" "}
          </Typography>
        </ButtonBase>
        <Stack sx={{ width: "100%" }} gap={3}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please specify trip name!" }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Trip Name"
                autoFocus
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                sx={{ mb: 3, mt: 0 }}
                {...field}
              />
            )}
          />
          <Stack direction="row" gap={2}>
            <DateSelectInput
              control={control}
              name="startDate"
              requiredErrorText="Please specify start date!"
              label="Start date"
              maxDate={formValues.endDate}
            />
            <DateSelectInput
              control={control}
              name="endDate"
              requiredErrorText="Please specify end date!"
              label="End date"
              minDate={formValues.startDate}
            />
          </Stack>
        </Stack>
      </Stack>
      <Controller
        name="description"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            multiline
            maxRows={6}
            slotProps={{ input: { inputProps: { maxLength: 200 } } }}
            helperText={
              fieldState.error?.message ?? `${field.value.length}/200`
            }
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />
      <Pagination />
      <PreviewImageDialog isOpen={isOpen} onClose={close} />
    </Stack>
  );

  function useTravelInfoForm() {
    const { handleSubmit, control, watch } = useForm<FormInput>({
      defaultValues: {
        name: "",
        description: "",
        startDate: null,
        endDate: null,
      },
    });
    const formValues = watch();

    const onSubmit: SubmitHandler<FormInput> = (data) => {
      // TODO: Save step info
      console.log(data);
    };

    return {
      handleSubmit,
      control,
      onSubmit,
      formValues,
    };
  }
}
