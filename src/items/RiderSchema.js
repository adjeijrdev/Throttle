import { z } from "zod/v3";


export const riderSchema = z
  .object({
    fullName: z.string().min(1, "Please provide your fullname!!!"),
    gender: z.enum(["FEMALE", "MALE"], {
      message: "Please specify your gender",
    }),
    dateOfBirth: z.date("Date of birth is required"),
    nationalIdentification: z.object({
      type: z.string().trim().min(1, "ID type required"),
      number: z.string().trim().min(1, "ID number required"),
    }),

    professionalDetails: z.object({
      driverLicenseNumber: z
        .string()
        .min(1, "Driver license number required!!!"),
      yearsOfDrivingExperience: z
        .string({ required_error: "Years of driving required" })
        .transform((val) => Number.parseInt(val))
        .refine((val) => Number.isInteger(val) && val >= 0, {
          message: "Please provide a positive integer",
        }),
    }),
    contactDetails: z.object({
      phoneNumber:z.string().trim().regex(/^\+[\w\s]{12,20}$/, {message: "Provide correct phone number and must contain only numbers"}).optional(),
      additionalPhoneNumber: z
        .string()
        .trim()
        .regex(/^\+?\d{10,20}$/, {
          message: "Provide correct phone number and must contain only numbers",
        })
        .optional()
        .or(z.literal("")),
      email: z
        .string({ message: "email required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, "email required!!!")
        .max(255),
      residentailAddress: z
        .string()
        .trim()
        .min(1, "residentail address required!!!")
        .optional(),
      emergencyContactName: z.string().optional(),
      emergencyContactNumber: z
        .string()
        .trim()
        .regex(/^\+?\d{10,20}$/, {
          message: "Provide correct phone number and must contain only numbers",
        })
        .optional()
        .or(z.literal("")),
    }),
    vehicleInfo: z.object({
      vehicleType: z
        .string()
        .trim()
        .min(1, { message: "vehicle type required!!!" }),
      registrationNumber: z
        .string()
        .trim()
        .min(1, { message: "vehicle registration number required!!!" }),
    }),
    financialDetails: z
      .object({
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
            phoneNumber: z
              .string()
              .trim()
              .regex(/^\d{10,20}$/, {
                message:
                  "Provide correct phone number and must contain only numbers",
              })
              .optional()
              .or(z.literal("")),
          })
          .optional(),
      })
      .superRefine((val, ctx) => {
        const bank = val.bankAccountDetails;
        const momo = val.mobileMoneyAccount;

        const hasBankDetails =
          bank && (bank.bankName || bank.accountNumber || bank.recipientName);
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
        if (
          bank &&
          (bank.bankName || bank.recipientName || bank.accountNumber)
        ) {
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
          if (momo.phoneNumber?.trim()?.length < 10) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Phone number length is incorrect",
              path: ["mobileMoneyAccount", "phoneNumber"],
            });
          }
        }
      }),

    driverLicense: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
        "Only JPEG, PNG, or SVG files are allowed"
      )
      .optional(),
    nationalIdentificationImge: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
        "Only JPEG, PNG, or SVG files are allowed"
      )
      .optional(),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],

     when(payload) { 
      return schema 
        .pick({ password: true, confirmpassword: true }) 
        .safeParse(payload.value).success; 
    }, 
  });
