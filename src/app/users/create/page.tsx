"use client"

import React, { useState } from "react"
import { Box, TextField, Alert, Typography } from "@mui/material"
import { Create } from "@refinedev/mui"
import { useForm } from "@refinedev/react-hook-form"
import { userFields } from "@/utils/userFields"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { useRouter } from "next/navigation"
import { supabaseBrowserClient } from "../../../utils/supabase/client" // Updated import

export default function UserCreate() {
  const isAdmin = useIsAdmin()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isAdmin) {
      router.push("/users")
    }
  }, [isAdmin, router])

  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    refineCoreProps: {
      resource: "users",
      redirect: "list",
      action: "create",
      onMutationError: (error) => {
        setError(error?.message || "An error occurred")
      },
    },
  })

  // Watch password fields to validate they match
  const password = watch("password")
  const confirmPassword = watch("confirm_password")

  // Custom submit handler to create both auth user and profile
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirm_password) {
      setError("Passwords do not match")
      return
    }

    try {
      // First create the auth user - using supabaseBrowserClient
      const { data: authData, error: authError } = await supabaseBrowserClient.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      })

      if (authError) throw authError

      // The user profile will be created automatically by our trigger
      // But we can also update it with additional fields - using supabaseBrowserClient
      const { error: profileError } = await supabaseBrowserClient
        .from("users")
        .update({
          name: data.name,
          gender: data.gender,
          birth_date: data.birth_date,
          phone: data.phone,
        })
        .eq("user_id", authData.user.id)

      if (profileError) throw profileError

      // Redirect to the users list
      router.push("/users")
    } catch (error: any) {
      setError(error.message || "Failed to create user")
    }
  }

  if (!isAdmin) {
    return <Typography>Redirecting...</Typography>
  }

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onSubmit),
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
          </Alert>
        )}

        {userFields
          .filter((field) => isAdmin || !field.adminOnly)
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
            />
          ))}
      </Box>
    </Create>
  )
}

