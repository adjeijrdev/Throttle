import { z } from "zod/v3";

export const ThirdPartySchema = z.object({
  // Step 1: Business Info
  companyName: z.string().min(1, "Company name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  gpsAddress: z.string().min(1, "GPS address is required").regex(/^[A-Z]{2}-\d{3}-\d{4}$/, "Invalid GPS address format. Example: GA-492-1234"),
  region: z.object({
    value:z.string(),
    label: z.string()
  },"Please select your region"),
  yearsInOperation: z.string().optional(),

  // Step 2: Contact Details
  primaryContact: z.string().min(1, "Primary contact is required"),
  phoneNumber: z.string().trim().regex(/^\+[\w\s]{12,20}$/, {message: "Provide correct phone number and must contain only numbers"}),
  position: z.string().min(1, "Position is required"),
  ghanaCardNumber: z.string().min(1, "Ghana card number is required").regex(/^GHA-\d{8,9}-.$/,"Invalid ghana card number format. Example: GHA"),
  email: z.string().email("Invalid email address"),
  officeLine: z.string().optional(),

  // Step 3: Payment Details
financialDetails: z.object({
  bankAccountDetails: z
    .object({
      bankName: z.string().trim().optional(),
      accountNumber: z.string().trim().optional(),
      recipientName: z.string().trim().optional(),
    })
    .optional(),
  mobileMoneyAccount: z
    .object({
      recipientName: z.string().trim().optional(),
      phoneNumber: z.string().trim().regex(/^\+[\d\s]{12,20}$/, {message: "Provide correct phone number and must contain only numbers"}).optional().or(z.literal("")),
    })
    .optional(),
}).superRefine((val, ctx) => {
  const bank = val.bankAccountDetails;
  const momo = val.mobileMoneyAccount;


  const hasBankDetails = bank && (bank?.bankName?.trim() || bank?.accountNumber?.trim() || bank?.recipientName?.trim());
  const hasMomoDetails = momo && (momo?.phoneNumber?.trim() || momo?.recipientName?.trim());

  if (!hasBankDetails && !hasMomoDetails) {
   

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Provide at least bank or mobile money account details",
      path: ["financialDetails"],
    });
    return; 
  }

  // Validate bank details if any bank field exists
  if (bank && (bank?.bankName?.trim() || bank?.recipientName?.trim() || bank?.accountNumber?.trim())) {


    if (!bank?.accountNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account Number is required",
        path: ["bankAccountDetails", "accountNumber"],
      });
    }
    if (!bank?.recipientName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recipient Name is required",
        path: ["bankAccountDetails", "recipientName"],
      });
    }
    if (!bank?.bankName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank Name is required",
        path: ["bankAccountDetails", "bankName"],
      });
    }
  }

  // Validate mobile money details if any momo field exists
  if (momo && (momo?.phoneNumber?.trim() || momo?.recipientName?.trim())) {

    if (!momo?.phoneNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile money number is required",
        path: ["mobileMoneyAccount", "phoneNumber"],
      });
    }
    if (!momo?.recipientName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile money recipient name is required",
        path: ["mobileMoneyAccount", "recipientName"],
      });
    }
    if (momo?.phoneNumber?.trim()?.length < 10){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number length is incorrect",
        path: ["mobileMoneyAccount", "phoneNumber"],
      });
    }
  }
}),
  // Step 4: Document Uploads
 businessLogo: z
    .instanceof(File, { message: "Business logo is required" })
    .refine(file => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      file => ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type),
      "Only JPEG, PNG, or SVG files are allowed"
    ).optional(),

    registrationCertificate:  z
    .instanceof(File, { message: "Registration certificate is required" })
    .refine(file => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      file => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      "Only JPEG, PNG, or PDF files are allowed"
    ).optional(),

  // Step 5: Account Details
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string()
})
// Password match validation
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
