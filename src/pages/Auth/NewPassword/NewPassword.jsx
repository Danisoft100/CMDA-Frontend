import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import Button from "~/components/Global/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "~/components/Global/ConfirmationModal/ConfirmationModal";
import icons from "~/assets/js/icons";
import { usePasswordResetMutation } from "~/redux/api/auth/authApi";
import { toast } from "react-toastify";

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  const handleResetPassword = async (payload) => {
    const resetData = { ...payload };
    passwordReset(resetData)
      .unwrap()
      .then(() => setConfirm(true))
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">New Password</h2>
      <p className=" text-gray-dark text-sm">Kindly input your New Password to Login into your account </p>
      <form className="my-6" onSubmit={handleSubmit(handleResetPassword)}>
        <div className="max-w-[480px] w-full">
          <div className="mb-4  text-gray-500">
            <TextInput
              type="tel"
              label="token"
              required={true}
              register={register}
              errors={errors}
              placeholder="Enter token sent to your email"
              className="text-gray-500"
            />
          </div>

          <div className="mb-4  text-gray-500">
            <TextInput
              type="password"
              label="newPassword"
              required={true}
              register={register}
              errors={errors}
              placeholder="Enter password"
              className="text-gray-500"
            />
          </div>

          <div className="mb-4  text-gray-500">
            <TextInput
              type="password"
              label="confirmPassword"
              required={true}
              register={register}
              errors={errors}
              placeholder="Enter password"
              className="text-gray-500"
              rules={{
                validate: (value) => value === watch("newPassword") || "Passwords do not match",
              }}
            />
          </div>

          <div className="grid w-full gap-y-4">
            <Button type="submit" large loading={isLoading}>
              Change Password
            </Button>

            <Link to="/login" className="mx-auto text-primary font-semibold text-sm hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </form>

      <ConfirmationModal
        icon={icons.check}
        title="Congratulations"
        subtitle={`Password reset successfully`}
        subAction={null}
        maxWidth={400}
        mainAction={() => navigate("/login")}
        mainActionText="Go Back to Login"
        isOpen={confirm}
        onClose={() => setConfirm(false)}
      />
    </div>
  );
};

export default NewPassword;
