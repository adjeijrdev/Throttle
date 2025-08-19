import z from "zod";



export const addOrderSchema = z.object({
    recipient: z.string().trim().min(3,"⚠ recipient name is requied"),
    phoneNumber: z.string({ message: "phone number required" }).trim().min(10, { message: "phone number is required" }).max(20).regex(/^\d{10,20}$/, {
              message: "Phone number should contain only numbers",
            }),
    destination: z.string().trim().min(2,"⚠ destination is requied"),
    orderPrice: z.string().trim().min(1,"⚠ order price is required").regex(/^\d*$/, {
          message: "Only positive number is allowed",
        }),
    deliveryPrice: z.string().trim().min(1,"⚠ order price is required").regex(/^\d*$/, {
          message: "Only positive number is allowed",
        }).optional(),
    description: z.string().trim().optional(),
    productImage:  z.instanceof(File)
          .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
            "Only JPEG, PNG, or SVG files are allowed"
          )
          .optional()
})