import { z } from "zod/v3";

export const riderSchema = z.object({
  userProfile: z.object({
    fullName: z.string().min(1, "Please provide your fullname!!!"),
    gender: z.enum(["FEMALE", "MALE"], {
      message: "Please specify your gender",
    }),
    dateOfBirth: z.string({ required_error: "date of birth required" }),
    password: z.string({required_error:"Password is required"}).trim().min(8,{message:"Minimum password length should be 8 characters"}).max(255),
    confirmPassword: z.string(),
    nationalIdentification: z.object({
      type: z.string().trim(),
      number: z.string().trim(),
    }),
  }).refine((val)=> val.password === val.confirmPassword,{
    message:"Confirm password and password don't match",
    path:["confirmPassword"]
}),
professionalDetails:z.object({
    yearsOfDrivingExperience:z.number({message:"Years of driving required"}),
    driverLicenseNumber: z.string({message:"Driver license number required"}).optional()
}),
 contactDetails:z.object({
    phoneNumber: z.string({required_error:"phone number required"}).min(10,{message:"phone number length is incorrect"}).max(20),
    additionalPhoneNumber: z.string({required_error:"phone number required"}).min(10,{message:"phone number length is incorrect"}).max(20).optional(),
    email:z.string().trim().email({message:"Invalid email address"}).min(5).max(255),
    residentailAddress: z.string().optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactNumber: z.string().optional()
}),
vehicleInfo: z.object({
    vehicleType:z.string(),
    registrationNumber: z.string()
}),
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
      phoneNumber: z.string()
        // .string({ message: "Phone number is required" })
        // .min(10, { message: "Phone number length is incorrect" })
        // .max(20)
        .optional(),
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
})
});
