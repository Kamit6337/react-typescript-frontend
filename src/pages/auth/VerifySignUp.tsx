import Box from "@/components/custom/Box";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useState } from "react";
import OtpInput from "./OtpInput";
import modifyEmail from "@/utils/javascript/modifyEmail";
import { useNavigate } from "react-router-dom";

const VerifySignUp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const email = localStorage.getItem("email") || "example@gmail.com";
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const modifyOtp = otp.join("");

      console.log(modifyOtp);

      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Please try later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box title="Verify your email">
        <div className="text-center">
          <p>Enter the 8 digit code you have received on</p>
          <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
        </div>
        <OtpInput otp={otp} cb={(value: string[]) => setOtp(value)} />
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full mt-12"
        >
          {isLoading ? <Loading /> : "Verify"}
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default VerifySignUp;
