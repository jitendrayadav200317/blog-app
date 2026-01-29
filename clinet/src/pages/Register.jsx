import React from "react";
import { motion } from "motion/react";
import { Button, Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { data, Link } from "react-router-dom";
import { registerUser } from "../redux/slice/authSlice";
const passwordSchema = z
  .string()
  .min(8, { message: "Password should be at least 8 character long" })
  .superRefine((value, ctx) => {
    if (!/[A-Z]/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must required at least one uppercase case",
      });
    }
    if (!/[a-z]/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must required at least one lowercase case",
      });
    }
    if (!/[0-9]/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must required at least one digit",
      });
    }
  });

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "name should contain to be at least 1 charater" }),
    email: z
      .string()
      .min(4, { message: "this is has to be email" })
      .email("this is valid email"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });
const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-150"
      >
        <h1 className="text-2xl font-bold mb-4">Sing Up</h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Enter Name..."
              className="focus:outline-none border-b w-full border-gray-200 "
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message} </p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200 "
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500"> {errors.email.message} </p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="password"
              name="password"
              placeholder="Enter Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register("password")}
            />
            {errors.password && (
              <p className="test-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              name="confirmPassword"
              placeholder="confram Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message} </p>
            )}
          </div>

          <Button type="submit" color="#6f6af8">
            {loading ? <Loader color="pink" size={18} /> : "Register"}
          </Button>
          <p className=" text-gray-800">
            Already have an account?
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
export default Register;
