"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@refinedev/react-hook-form"
import { createUser, type CreateUserData } from "@/services/user-service"

export function useUserForm(redirectPath = "/users") {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Form submission handler
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirm_password) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      setErrorDetails(null)

      console.log("Submitting user data:", {
        email: data.email,
        passwordLength: data.password?.length,
        name: data.name,
        gender: data.gender,
        birth_date: data.birth_date,
        phone: data.phone,
      })

      const userData: CreateUserData = {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender,
        birth_date: data.birth_date,
        phone: data.phone,
        role: data.role || "user",
      }

      await createUser(userData)

      // Redirect to the users list on success
      router.push(redirectPath)
    } catch (error: any) {
      console.error("Error creating user:", error)
      setError(error.message || "Failed to create user")

      // If there are additional error details, store them
      if (error.details) {
        setErrorDetails(error.details)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    formLoading,
    saveButtonProps,
    error,
    errorDetails,
    watch,
  }
}

