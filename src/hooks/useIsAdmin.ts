import { useGetIdentity } from "@refinedev/core"

export const useIsAdmin = () => {
  const { data: user } = useGetIdentity<{
    id: string
    email: string
    user_metadata?: {
      role?: string
    }
  }>()

  console.log("User data:", user)

  // Check if the user has an admin or super_admin role in user_metadata
  return user?.user_metadata?.role === "admin" || user?.user_metadata?.role === "super_admin"
}

// You can also create a more specific hook if needed
export const useIsSuperAdmin = () => {
  const { data: user } = useGetIdentity<{
    id: string
    email: string
    user_metadata?: {
      role?: string
    }
  }>()

  // Check if the user has a super_admin role
  return user?.user_metadata?.role === "super_admin"
}

