import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts2/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

type ResetPasswordFormData = {
  email: string;
  pin: string;
  newPassword: string;
  confirmPassword: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [showResetForm, setShowResetForm] = useState(false);

  // Original Sign In Form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  // Password Reset Form
  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch,
  } = useForm<ResetPasswordFormData>();

  // Sign In Mutation
  const signInMutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // Password Reset Mutation
  const resetMutation = useMutation(apiClient.resetPassword, {
    onSuccess: () => {
      showToast({ message: "Password reset successfully!", type: "SUCCESS" });
      setShowResetForm(false);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    signInMutation.mutate(data);
  });

  const onResetSubmit = handleResetSubmit((data) => {
    resetMutation.mutate(data);
  });

  return (
    <div className="flex flex-col gap-5">
      {!showResetForm ? (
        // Sign In Form
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Sign In</h2>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>

          <span className="text-sm">
            Not Registered?{" "}
            <Link className="underline" to="/register">
              Create an account here
            </Link>
          </span>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
              disabled={signInMutation.isLoading}
            >
              {signInMutation.isLoading ? "Signing In..." : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => setShowResetForm(true)}
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      ) : (
        // Password Reset Form
        <form className="flex flex-col gap-5" onSubmit={onResetSubmit}>
          <h2 className="text-3xl font-bold">Reset Password</h2>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal"
              {...resetRegister("email", { required: "Email is required" })}
            />
            {resetErrors.email && (
              <span className="text-red-500">{resetErrors.email.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            PIN
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              {...resetRegister("pin", {
                required: "PIN is required",
                pattern: {
                  value: /^23840152$/,
                  message: "Invalid PIN code",
                },
              })}
            />
            {resetErrors.pin && (
              <span className="text-red-500">{resetErrors.pin.message}</span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            New Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...resetRegister("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
            />
            {resetErrors.newPassword && (
              <span className="text-red-500">
                {resetErrors.newPassword.message}
              </span>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...resetRegister("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === watch("newPassword") || "Passwords do not match",
              })}
            />
            {resetErrors.confirmPassword && (
              <span className="text-red-500">
                {resetErrors.confirmPassword.message}
              </span>
            )}
          </label>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
              disabled={resetMutation.isLoading}
            >
              {resetMutation.isLoading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => setShowResetForm(false)}
              className="text-blue-600 hover:underline text-sm"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;
