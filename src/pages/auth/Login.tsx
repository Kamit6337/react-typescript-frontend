import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, "Email must me provided"),
  password: z.string().min(8, "Password should at least 6 character"),
});

const Login = () => {
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
      password: "",
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
        <Box title="Login" height={691} gap={30}>
          <div className="space-y-1 text-center">
            <p className="text-2xl font-medium">Welcome back to ECOMMERCE</p>
            <p>The next gen business marketplace</p>
          </div>
          <Input
            name="email"
            type="email"
            title="Email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            name="password"
            type="password"
            title="Password"
            register={register}
            error={errors.password?.message}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loading /> : "Login"}
          </Button>
          <div className="mt-3 flex items-center gap-3">
            <p className="text-light_black">Don’t have an Account?</p>
            <button className="font-semibold uppercase tracking-wider">
              <Link to={"/signup"}>Sign Up</Link>
            </button>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
