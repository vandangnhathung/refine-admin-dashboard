"use client"
import { Box, TextField, Alert, Typography, CircularProgress } from "@mui/material"
import { Create } from "@refinedev/mui"
import { useSampleForm } from "@_sample-route/hooks/useSampleForm"
import { sampleFields } from "@/types/sampleFields"

export default function SampleCreate() {
  const { register, errors, handleSubmit, onSubmit, isSubmitting, formLoading, saveButtonProps, error, errorDetails } =
  useSampleForm()

  return (
    <Create
      isLoading={formLoading || isSubmitting}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onSubmit),
        disabled: isSubmitting,
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
            {errorDetails && (
              <Typography variant="body2" component="pre" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(errorDetails, null, 2)}
              </Typography>
            )}
          </Alert>
        )}

        {isSubmitting && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {sampleFields.map((field) => (
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
  )
}

