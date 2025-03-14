// Service for handling sample-related API calls
export interface CreateSampleData {
  sampleField: string
}

  export async function createSample(sampleData: CreateSampleData) {
    const response = await fetch("/api/sample", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleData),
    })
  
    const result = await response.json()
  
    if (!response.ok) {
      console.error("API error response:", result)
      const error = new Error(result.error || "Failed to create sample")
      // @ts-ignore
      error.details = result.details || null
      throw error
    }
  
    return result
  }
  
  