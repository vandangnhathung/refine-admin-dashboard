import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, password, name, gender, birth_date, phone, role } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Create a Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          gender,
        //   birth_date,
          phone,
          role
        },
      },
    })


    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      user: data.user,
      message: "User created successfully",
    })
  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}

