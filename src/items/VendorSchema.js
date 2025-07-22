import { z } from "zod/v3";
import toast from "react-hot-toast";
export const VendorSchema = z
  .object({
    // Step 1: Business Info
    businessname: z.string().min(1, "Business name is required"),
    businessaddress: z.string().min(1, "Address is required"),
    businesstype: z.string().min(1, "Business type is required"),
    country: z.string().min(1, "Country is required"),
    regnumber: z.string().min(1, "Registration number is required"),
    years: z
      .string()
      .transform((val, ctx) => {
        try {
          const parsed = Number.parseInt(String(val));
          return parsed;
        } catch (e) {
          ctx.issues.push({
            code: "custom",
            message: "Please provide a positive integer",
            input: val,
          });
          return z.NEVER;
        }
      })
      .optional(),

    // Step 2: Contact Details
    vendorname: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is incorrect"),
    website: z.string().optional(),


financialDetails: z.object({
  bankAccountDetails: z
    .object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      recipientName: z.string().optional(),
    })
    .optional(),
  mobileMoneyAccount: z
    .object({
      recipientName: z.string().optional(),
      phoneNumber: z.string().trim().regex(/^\d{10,20}$/, {message: "Provide correct phone number and must contain only numbers"}).optional().or(z.literal("")),
    })
    .optional(),
}).superRefine((val, ctx) => {
  const bank = val.bankAccountDetails;
  const momo = val.mobileMoneyAccount;


  const hasBankDetails = bank && (bank.bankName || bank.accountNumber || bank.recipientName);
  const hasMomoDetails = momo && (momo.phoneNumber || momo.recipientName);

  if (!hasBankDetails && !hasMomoDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Provide at least bank or mobile money account details",
      path: [],
    });
    return; 
  }

  // Validate bank details if any bank field exists
  if (bank && (bank.bankName || bank.recipientName || bank.accountNumber)) {
    if (!bank.accountNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account Number is required",
        path: ["bankAccountDetails", "accountNumber"],
      });
    }
    if (!bank.recipientName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recipient Name is required",
        path: ["bankAccountDetails", "recipientName"],
      });
    }
    if (!bank.bankName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bank Name is required",
        path: ["bankAccountDetails", "bankName"],
      });
    }
  }

  // Validate mobile money details if any momo field exists
  if (momo && (momo.phoneNumber || momo.recipientName)) {

    if (!momo.phoneNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile money number is required",
        path: ["mobileMoneyAccount", "phoneNumber"],
      });
    }
    if (!momo.recipientName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile money recipient name is required",
        path: ["mobileMoneyAccount", "recipientName"],
      });
    }
    if (momo.phoneNumber?.trim()?.length < 10){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone number length is incorrect",
        path: ["mobileMoneyAccount", "phoneNumber"],
      });
    }
  }
}),

    // Step 4: Document Uploads
    logo: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
        "Only JPEG, PNG, or SVG files are allowed"
      )
      .optional(),

    // Step 5: Account Details
    // accountemail: z.string().email("Invalid email address"),
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });
