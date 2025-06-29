import { useForm } from "react-hook-form";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Button from "~/components/Global/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "~/redux/api/auth/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser, setVerifyEmail } from "~/redux/features/auth/authSlice";
import { EMAIL_PATTERN } from "~/utilities/regExpValidations";
import { setTokens } from "~/redux/features/auth/tokenSlice";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });

  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // Extract conference and email from URL parameters if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const conference = searchParams.get("conference");

    // Pre-fill email field if it's provided in the URL
    if (email) {
      setValue("email", email);
    }

    // Store conference slug in localStorage if present
    if (conference) {
      localStorage.setItem("conferenceSlug", conference);
    }
  }, [location.search, setValue]);
  const handleLogin = (payload) => {
    login(payload)
      .unwrap()
      .then(({ data }) => {
        dispatch(setUser(data?.user));
        dispatch(setTokens({ accessToken: data?.accessToken }));
        toast.success("Login successful");

        if (!data.user.emailVerified) {
          dispatch(setVerifyEmail(payload.email));
          navigate("/verify-email");
          return;
        }

        // Check if user was trying to register for a conference
        const conferenceSlug = localStorage.getItem("conferenceSlug");
        if (conferenceSlug) {
          // Remove the stored conference slug
          localStorage.removeItem("conferenceSlug");
          // Redirect to conference registration
          navigate(`/dashboard/events/${conferenceSlug}`);
          return;
        }

        // Otherwise use the standard redirect logic
        const redirectUrl = localStorage.getItem("redirectUrl");
        if (redirectUrl && redirectUrl.includes("dashboard")) navigate(redirectUrl);
        else navigate("/dashboard");
      })
      .catch((error) => {
        const message = error?.data?.message;
        if (message && message.includes("not verified")) {
          dispatch(setVerifyEmail(payload.email));
          navigate("/verify-email");
        } else {
          toast.error(message || "Login failed. Please try again.");
        }
      });
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Welcome Back</h2>
        <p className="text-gray-dark mt-2">Login to your account</p>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="grid grid-cols-1 gap-4">
        <div>
          <TextInput
            label="email"
            type="email"
            register={register}
            errors={errors}
            required
            placeholder="Enter email address"
            rules={{
              pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
            }}
          />
        </div>
        <div>
          <TextInput
            type="password"
            label="password"
            required={true}
            register={register}
            errors={errors}
            placeholder="Enter password"
          />
        </div>

        {/* forgot password */}
        <div className="ml-auto -mt-1">
          <Link to="/forgot-password" className=" text-primary font-semibold text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="grid gap-6">
          <Button large label="Login" loading={isLoading} className="w-full" type="submit" />
          <div className="text-center font-bold text-black ">
            Don&apos;t have an account?
            <Link to="/signup" className="ml-2 text-primary font-semibold text-sm hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
