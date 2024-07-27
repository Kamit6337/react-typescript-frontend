import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, "Email must me provided"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    try {
      navigate("/login");
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Forgot Password" gap={30}>
          <Input
            name="email"
            type="email"
            title="Email"
            register={register}
            error={errors.email?.message}
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

export default ForgotPassword;
