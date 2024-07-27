import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    password: z.string().min(8, "Password should at least 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const NewPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    try {
      navigate("/signup/verify");
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Create New Password" gap={30}>
          <Input
            name="password"
            type="password"
            title="Password"
            register={register}
            error={errors.password?.message}
          />
          <Input
            name="confirmPassword"
            type="password"
            title="Confirm Password"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loading /> : "Submit"}
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewPassword;
