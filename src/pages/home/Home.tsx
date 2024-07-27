import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Home = () => {
  const { showSuccessMessage } = Toastify();
  const { state } = useLocation();
  const navigate = useNavigate();
  const msg = useSearchParams()[0].get("msg");

  useEffect(() => {
    if (msg || state?.msg) {
      showSuccessMessage({ message: msg || state?.msg });
      navigate("/");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
        <p>Home Page</p>
        <Link to={`/login`}>Login</Link>
        <Link to={`/signup`}>Sign Up</Link>
        <Link to={`/signup/verify`}>Sign Up Verify</Link>
        <Link to={`/forgot`}>Forgot Password</Link>
        <Link to={`/newPassword`}>New Password</Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
