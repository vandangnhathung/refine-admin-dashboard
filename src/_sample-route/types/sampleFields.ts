// Define the interface first
export interface SampleField {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    adminOnly?: boolean; // Flag for fields only admins should see/edit
  }
  
  // Then use it to type the array
  export const sampleFields: SampleField[] = [
    { name: "name", label: "Name", required: true },
    { name: "label", label: "Label", required: true },
  ];
  