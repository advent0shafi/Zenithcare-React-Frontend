import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const PasswordModal = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleOpen = () => {
    setOpen((cur) => !cur);
    // Reset the password match error when the modal is opened
    setPasswordMatchError(false);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      // Passwords don't match, display an error and return
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await PublicAxios.put(`auth/password/${user_id}/`, {
        old_password: oldPassword,
        password: newPassword,
      });

      if (response.status === 200) {
        setPasswordMatchError(false); // Reset the password match error
        notify('passsword has been updated')
        handleOpen(); // Close the modal
      }
    } catch (error) {
      // Handle any errors, e.g., display an error message
      toast.error('An error has occured please wait')
      console.error("Error updating password:", error);
    }
  };

  const notify = (message) => toast.success(message);

  return (
    <>
      <div onClick={handleOpen}>Change Password</div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              className="mb-3 text-center font-semibold"
              variant="paragraph"
              color="gray"
            >
              Password Updations
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Current Password
            </Typography>
            <Input
              label="Current Password"
              size="lg"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              New Password
            </Typography>
            <Input
              label="Password"
              size="lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Confirm Password
            </Typography>
            <Input
              label="Confirm Password"
              size="lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordMatchError && (
              <Typography variant="small" color="red">
                Passwords do not match.
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className="bg-[#172786] hover:bg-blue-700 text-white font-bold py-2 px-16 border border-[#172786] rounded-lg"
              >
                Submit
              </button>
            </div>

            <Typography variant="small" className="mt-4 flex justify-center">
              Be careful when changing your password.
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        <Toaster />
      </Dialog>
    </>
  );
};

export default PasswordModal;
