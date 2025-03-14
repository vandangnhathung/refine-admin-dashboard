// Service for handling user-related API calls
export interface CreateUserData {
    email: string
    password: string
    name: string
    gender: string
    // birth_date: string
    phone: string
    role: "admin" | "user"
  }
  
  export async function createUser(userData: CreateUserData) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
  
    const result = await response.json()
  
    if (!response.ok) {
      console.error("API error response:", result)
      const error = new Error(result.error || "Failed to create user")
      // @ts-ignore
      error.details = result.details || null
      throw error
    }
  
    return result
  }
  
  