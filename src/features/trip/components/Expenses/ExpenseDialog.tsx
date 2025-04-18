import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  EXPENSES_CATEGORIES,
  EXPENSE_ICON_BY_CATEGORY,
} from "@features/trip/data";
import { Expense } from "@features/trip/types";
import { removeTrailingZeros } from "@features/trip/utils/removeTrailingZeros";
import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";

import ExpenseCategoryIcon from "./ExpenseCategoryIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addedExpense: Expense) => void;
}

interface FormInput {
  category: Expense["category"];
  amount: Expense["amount"];
  description: Expense["description"];
}

export default function ExpenseDialog(props: Props) {
  const { md } = useBreakpoints();
  const {
    handleSubmit,
    control,
    onSubmit,
    errors,
    register,
    selectedCategory,
    onReset,
    onCategoryClick,
  } = useExpenseForm(props);

  return (
    <AppDialog
      title="Add Expense"
      isOpen={props.isOpen}
      onClose={onReset}
      primaryButtonText="Save"
      isForm
      onPrimaryButtonClick={handleSubmit(onSubmit)}
      maxWidth={684}
    >
      <Stack sx={{ width: "100%" }} gap={4} />
      <Box>
        <Grid
          container={!md}
          display={{ xs: "grid", md: "flex" }}
          gridTemplateColumns="repeat(3, 75px)"
          columnGap={{ xs: 5, sm: 20, md: 0 }}
          justifyContent="space-between"
          rowGap={2}
        >
          {" "}
          {EXPENSES_CATEGORIES.map(({ id, category }) => {
            const iconInfo = EXPENSE_ICON_BY_CATEGORY[category];

            return (
              <Grid
                component="div"
                gap={1}
                alignItems="center"
                display="flex"
                flexDirection="column"
                key={id}
              >
                <ExpenseCategoryIcon
                  category={category}
                  onClick={() => onCategoryClick(category)}
                  color={iconInfo.color}
                  backgroundColor={iconInfo.backgroundColor}
                  borderColor={
                    category === selectedCategory ? iconInfo.color : "white"
                  }
                >
                  {<iconInfo.icon fontSize="large" />}
                </ExpenseCategoryIcon>
                <Typography variant="subtitle1">{category} </Typography>
              </Grid>
            );
          })}
          <input
            type="hidden"
            {...register("category", {
              required: "Please select a category!",
            })}
          />
        </Grid>
        {errors.category && (
          <FormHelperText error>{errors.category.message}</FormHelperText>
        )}
      </Box>
      <Stack>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Please specify the amount",
            validate: {
              positiveNumber: (value) =>
                value > 0 ? undefined : "Amount should be greater than zero",
            },
          }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Box sx={{ mb: 5 }}>
              {" "}
              {/* Extra margin for spacing */}
              <TextField
                type="number"
                inputRef={ref}
                variant="standard"
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                sx={{ mb: 3 }} // Apply marginBottom directly on the TextField
                {...field}
                onChange={(event) =>
                  field.onChange(removeTrailingZeros(event.target.value))
                }
              />
            </Box>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => (
            <TextField
              inputRef={ref}
              variant="standard"
              margin="normal"
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
      </Stack>
    </AppDialog>
  );
}

function useExpenseForm({ onSave, onClose }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
    watch,
    resetField,
    reset,
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      amount: 0,
      description: "",
      category: undefined,
    },
  });

  const selectedCategory = watch("category");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSave({ id: uuidv4(), ...data });
  };

  const onReset = () => {
    resetField("category");
    reset();
    onClose();
  };

  const onCategoryClick = (category: Expense["category"]) => {
    setValue("category", category);
    trigger("category");
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    errors,
    register,
    setValue,
    selectedCategory,
    onReset,
    onCategoryClick,
  };
}
