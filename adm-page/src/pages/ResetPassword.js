import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password email.
        </p>
        <form action="">
          <CustomInput type="password" label="New Password" id="password" />
          <CustomInput type="password" label="Confirm Password" id="password" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
