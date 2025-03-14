"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@refinedev/react-hook-form"
import { createSample, type CreateSampleData } from "@_sample-route/services/sample-service"

export function useSampleForm(redirectPath = "/sample") {
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
      resource: "sample",
      redirect: "list",
      action: "create",
      onMutationError: (error) => {
        setError(error?.message || "An error occurred")
      },
    },
  })

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

      console.log("Submitting sample data:", {
        name: data.name,
        label: data.label,
      })

      const sampleData: CreateSampleData = {
        sampleField: data.sampleField,
      }

      await createSample(sampleData)

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