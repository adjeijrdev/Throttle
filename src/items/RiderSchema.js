import { z } from "zod";

export const RiderSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.enum(["male", "female"]),
  dob: z.date().refine(date => {
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= minAgeDate;
  }, "You must be at least 18 years old"),
  idType: z.enum(["Driver's License", "Voter's ID"]),
  licenseNumber: z.string().min(6, "Invalid license number"),
  idNumber: z.string().min(6, "Invalid ID number"),

  // Contact Details
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  emergencyContactName: z.string().optional(),
  emergencyEmail: z.string().optional(),
  emergencyPhone: z.string().optional(),

  // Vehicle Details
  vehicleType: z.string().min(2, "Enter vehicle type"),
  vehicleRegNumber: z.string().min(6, "Invalid registration number"),

  // Payment & Billing
  bankName: z.string().min(2, "Bank name required"),
  momoName: z.string().min(2, "Mobile money name required"),
  bankNumber: z.string().min(8, "Invalid account number"),
  momoNumber: z.string().min(10, "Invalid mobile money number"),

  // Document Uploads
  licenseImage: z.instanceof(File).refine(file => file.size <= 5_000_000, "File too large (max 5MB)"),
  idImage: z.instanceof(File).refine(file => file.size <= 5_000_000, "File too large (max 5MB)"),

  // Account Details
  // accountEmail: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
.refine(
    (data) => {
      const hasBank = data.bankname && data.banknumber;
      const hasMomo = data.momoname && data.momonumber;

      // Accept if either is complete
      if (hasBank || hasMomo) {
        // Reject if partial bank info
        if (
          (data.bankname && !data.banknumber) ||
          (data.banknumber && !data.bankname)
        ) {
          return false;
        }
        // Reject if partial momo info
        if (
          (data.momoname && !data.momonumber) ||
          (data.momonumber && !data.momoname)
        ) {
          return false;
        }
        return true;
      }
      return false; // Neither method is complete
    },
    {
      message:
        "Please provide either complete bank details OR complete mobile money details",
      path: ["bankname"],
    }
  );

