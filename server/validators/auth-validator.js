const { z } = require('zod');

// Registration Validation
const signupSchema = z.object({
    firstName: z.string()
        .min(3, { message: "First Name must be at least 3 characters long." })
        .max(255, { message: "First Name can't be longer than 255 characters." }),
    lastName: z.string()
        .min(3, { message: "Last Name must be at least 3 characters long." })
        .max(255, { message: "Last Name can't be longer than 255 characters." }),
    email: z.string()
        .email({ message: "Invalid email address." })
        .min(3, { message: "Email must be at least 3 characters." })
        .max(255, { message: "Email can't be longer than 255 characters." }),
    phone: z.string()
        .length(12, { message: "Phone number must be 12 digits long." })
        .regex(/^[0-9]+$/, { message: "Phone number must contain only digits." }),
    cnic: z.string()
        .length(13, { message: "CNIC must be 13 digits long." })
        .regex(/^[0-9]+$/, { message: "CNIC must contain only digits." }),
    dob: z.string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Date of Birth must be in dd-mm-yyyy format." }),
    gender: z.enum(['Male', 'Female']),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(1024, { message: "Password can't be longer than 1024 characters." })
});

// Login Validation
const loginSchema = z.object({
  email: z
      .string({ required_error: "Email is Required"})
      .trim()
      .email({message: "Invalid Email Address"})
      .min(3, { message: "Email must be at least of 3 characters."})
      .max(255, { message: "Email must not be more than 255 characters"}),
  password: z
      .string({ required_error: "Password is Required"})
      .trim()
      .min(7, { message: "Password must be at least of 7 characters."})
      .max(1024, { message: "Password must not be more than 1024 characters"}),
});

module.exports = { loginSchema, signupSchema };
