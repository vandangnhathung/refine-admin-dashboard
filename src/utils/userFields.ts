// Define the interface first
export interface UserField {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    adminOnly?: boolean; // Flag for fields only admins should see/edit
  }
  
  // Then use it to type the array
  export const userFields: UserField[] = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true, adminOnly: true },
    { name: "confirm_password", label: "Confirm Password", type: "password", required: true, adminOnly: true },
    { name: "gender", label: "Gender", required: true },
    // { name: "birth_date", label: "Birth Date", type: "date", required: true },
    { name: "phone", label: "Phone Number", required: true },
    { name: "role", label: "Role", adminOnly: true },
  ];
  