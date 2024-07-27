import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <p>Home Page</p>
      <Link to={`/login`}>Login</Link>
      <Link to={`/signup`}>Sign Up</Link>
      <Link to={`/signup/verify`}>Sign Up Verify</Link>
      <Link to={`/forgot`}>Forgot Password</Link>
      <Link to={`/newPassword`}>New Password</Link>
    </div>
  );
};

export default Home;
