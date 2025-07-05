import { z } from "zod";

export const VendorSchema = z
  .object({
    // Step 1: Business Info
    businessname: z.string().min(1, "Business name is required"),
    businessaddress: z.string().min(1, "Address is required"),
    businesstype: z.string().min(1, "Business type is required"),
    country: z.string().min(1, "Country is required"),
    regnumber: z.string().optional(),
    years: z.string().min(1, "Years in operation is required"),

    // Step 2: Contact Details
    vendorname: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),

    // Step 3: Payment & Billing
    bankname: z.string().optional(),
    momoname: z.string().optional(),
    banknumber: z.string().optional(),
    momonumber: z.string().optional(),

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
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
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
