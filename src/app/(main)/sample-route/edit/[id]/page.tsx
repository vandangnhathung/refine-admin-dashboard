"use client"

import { Box, TextField, Alert } from "@mui/material"
import { Edit } from "@refinedev/mui"
import { useForm } from "@refinedev/react-hook-form"
import { useParams } from "next/navigation"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { useState } from "react"
import { sampleFields } from "@/types/sampleFields"

export default function SampleEdit() {
  const isAdmin = useIsAdmin()
  const params = useParams()
  const userId = params.id as string
  const [error, setError] = useState<string | null>(null)

  const {
    saveButtonProps,
    register,
    formState: { errors },
    refineCore: { queryResult, formLoading },
  } = useForm({
    refineCoreProps: {
      resource: "users",
      id: userId,
      redirect: "list",
      action: "edit",
      onMutationError: (error) => {
        setError(error?.message || "An error occurred")
      },
    },
  })

  // Get the user data from the query result
  const userData = queryResult?.data?.data

  // Show loading state while fetching data
  if (formLoading) {
    return <div>Loading...</div>
  }

  return (
    <Edit saveButtonProps={isAdmin ? saveButtonProps : { disabled: true }} headerButtons={isAdmin ? undefined : []}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!isAdmin && (
          <Alert severity="info" sx={{ mb: 2 }}>
            You have read-only access to this information.
          </Alert>
        )}

        {sampleFields
          .filter(
            (field) =>
              // Filter out password fields for edit form
              !field.name.includes("password") &&
              // Filter admin-only fields for non-admins
              (isAdmin || !field.adminOnly),
          )
          .map((field) => (
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
              defaultValue={userData?.[field.name] || ""}
              disabled={!isAdmin}
            />
          ))}
      </Box>
    </Edit>
  )
}

