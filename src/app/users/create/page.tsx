"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export default function UserCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  // const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
  //   resource: "categories",
  // });

  const userFields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "gender", label: "Gender" },
    { name: "birth_date", label: "Birth Date", type: "date" },
    { name: "phone", label: "Phone Number" },
  ]


  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
       {userFields.map((field) => (
          <TextField
            key={field.name}
            {...register(field.name, {
              required: field.required ? "This field is required" : false,
            })}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message as string}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type={field.type || "text"}
            label={field.label}
            name={field.name}
          />
        ))}
      </Box>
    </Create>
  );
}
