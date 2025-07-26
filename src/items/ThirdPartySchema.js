import { z } from "zod";

export const ThirdPartySchema = z.object({
  // Step 1: Business Info
  companyName: z.string().min(1, "Company name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  gpsAddress: z.string().min(1, "GPS address is required"),
  region: z.string().min(1, "Please select your region"),
  yearsInOperation: z.string().min(1, "Years in operation is required"),

  // Step 2: Contact Details
  primaryContact: z.string().min(1, "Primary contact is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  position: z.string().min(1, "Position is required"),
  ghanaCardNumber: z.string().min(1, "Ghana card number is required"),
  email: z.string().email("Invalid email address"),
  officeLine: z.string().optional(),

  // Step 3: Payment Details
  bankName: z.string().optional(),
  mobileMoneyName: z.string().optional(),
  bankAccountName: z.string().optional(),
  mobileMoneyNumber: z.string().optional(),
  bankAccountNumber: z.string().optional(),

  // Step 4: Document Uploads
  registrationCertificate: z
    .instanceof(File, { message: "Registration certificate is required" })
    .refine(file => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      file => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      "Only JPEG, PNG, or PDF files are allowed"
    ),
  businessLogo: z
    .instanceof(File, { message: "Business logo is required" })
    .refine(file => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      file => ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type),
      "Only JPEG, PNG, or SVG files are allowed"
    ),

  // Step 5: Account Details
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string()
})
// Password match validation
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
// Payment method validation (either bank or mobile money)
.refine(data => {
  const hasBank = data.bankAccountName && data.bankAccountNumber;
  const hasMobileMoney = data.mobileMoneyName && data.mobileMoneyNumber;
  
  // At least one payment method must be complete
  if (hasBank || hasMobileMoney) {
    // If bank details started, both must be present
    if ((data.bankName || data.bankAccountNumber) && !hasBank) return false;
    // If mobile money details started, both must be present
    if ((data.mobileMoneyName || data.mobileMoneyNumber) && !hasMobileMoney) return false;
    return true;
  }
  return false;
}, {
  message: "Please provide either complete bank details (name + number) OR complete mobile money details",
  path: ["bankName"]
});