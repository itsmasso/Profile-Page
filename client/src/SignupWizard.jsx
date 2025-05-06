import React, { useState } from "react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import StepWizard from "react-step-wizard";

const SignupWizard = () => {
    const [formData, setFormData] = useState({
        username: '',
        password:'',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        biography: '',
        favoriteNumber: '',
        profilePicture: '',
})

  return (
    <StepWizard>
      <SignupStep1 formData={formData} setFormData={setFormData}/>
      <SignupStep2 formData={formData} setFormData={setFormData}/>
    </StepWizard>
  );
};

export default SignupWizard;
