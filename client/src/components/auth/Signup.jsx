import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { validateSignup } from "../../utils/validation";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  const [manualInterest, setManualInterest] = useState("");
  const [suggestedInterests] = useState([
    "Java",
    "CPP",
    "HTML",
    "CSS",
    "Javascript",
    "React js",
    "Node js",
    "Programming"
  ]);

  const handleToggleInterest = (interest) => {
    const interestExists = values.interests.includes(interest);
    let updatedInterests;

    if (interestExists) {
      updatedInterests = values.interests.filter((item) => item !== interest);
    } else {
      updatedInterests = [...values.interests, interest];
    }

    handleChange({
      target: {
        name: "interests",
        value: updatedInterests,
      },
    });
  };

  const handleAddCustomInterest = () => {
    if (
      manualInterest.trim() !== "" &&
      !values.interests.includes(manualInterest.trim())
    ) {
      const updated = [...values.interests, manualInterest.trim()];
      handleChange({
        target: {
          name: "interests",
          value: updated,
        },
      });
      setManualInterest("");
    }
  };

  const { values, errors, handleChange, handleBlur, setErrors } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    interests: [],
    phonenumber: "",
  });

  const stepFields = [
    ["firstname", "lastname", "email", "phonenumber"],
    ["qualification", "interests"],
    ["password", "confirmPassword"],
  ];

  const stepLabels = ["Personal Info", "Professional", "Security"];

  const validateCurrentStep = () => {
    const fieldsToValidate = stepFields[step];
    const currentValues = {};
    fieldsToValidate.forEach((f) => {
      currentValues[f] = values[f];
    });
    const validationErrors = validateSignup(currentValues);
    const filteredErrors = {};
    Object.keys(validationErrors).forEach((key) => {
      if (fieldsToValidate.includes(key))
        filteredErrors[key] = validationErrors[key];
    });
    setErrors(filteredErrors);
    return filteredErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateCurrentStep();
    if (Object.keys(validationErrors).length === 0) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      for (let i = 0; i < stepFields.length; i++) {
        if (stepFields[i].some((f) => validationErrors[f])) {
          setStep(i);
          break;
        }
      }
      return;
    }

    const formattedValues = {
      ...values,
    };

    setLoading(true);
    try {
      await signup(formattedValues);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (step / (stepLabels.length - 1)) * 100;

  return (
    <div className="su-card">
      <div className="su-header">
        <h3>Create an Account</h3>
        <p>Join our community and start your journey</p>
      </div>

      <section className="su-step-wizard">
        <div className="su-progress-container">
          <div
            className="su-progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <ul className="su-step-wizard-list">
            {stepLabels.map((label, idx) => (
              <li
                key={label}
                className={`su-step-wizard-item ${
                  step === idx ? "su-current-item" : ""
                } ${step > idx ? "su-completed-item" : ""}`}
              >
                <span className="su-progress-count">{idx + 1}</span>
                <span className="su-progress-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {authError && <div className="su-alert su-error">{authError}</div>}
      {success && (
        <div className="su-alert su-success">
          Account created successfully! Redirecting to login...
        </div>
      )}

      <form
        className="su-form"
        onSubmit={step === stepFields.length - 1 ? handleSubmit : handleNext}
        noValidate
      >
        {step === 0 && (
          <>
            <div className="su-row">
              <div className="su-form-group">
                <label htmlFor="su-firstname">First Name *</label>
                <input
                  type="text"
                  id="su-firstname"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={errors.firstname ? "su-input-error" : ""}
                />
                {errors.firstname && (
                  <small className="su-error-text">{errors.firstname}</small>
                )}
              </div>

              <div className="su-form-group">
                <label htmlFor="su-lastname">Last Name</label>
                <input
                  type="text"
                  id="su-lastname"
                  name="lastname"
                  placeholder="Enter your last name"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.lastname ? "su-input-error" : ""}
                />
                {errors.lastname && (
                  <small className="su-error-text">{errors.lastname}</small>
                )}
              </div>
            </div>

            <div className="su-form-group">
              <label htmlFor="su-email">Email Address *</label>
              <input
                type="email"
                id="su-email"
                name="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.email ? "su-input-error" : ""}
              />
              {errors.email && (
                <small className="su-error-text">{errors.email}</small>
              )}
            </div>

            <div className="su-form-group">
              <label htmlFor="su-phonenumber">Phone Number</label>
              <input
                type="text"
                id="su-phonenumber"
                name="phonenumber"
                placeholder="Enter your phone number"
                value={values.phonenumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phonenumber ? "su-input-error" : ""}
              />
              {errors.phonenumber && (
                <small className="su-error-text">{errors.phonenumber}</small>
              )}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="su-form-group">
              <label htmlFor="su-qualification">Qualification *</label>
              <input
                type="text"
                id="su-qualification"
                name="qualification"
                placeholder="Enter your highest qualification"
                value={values.qualification}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.qualification ? "su-input-error" : ""}
              />
              {errors.qualification && (
                <small className="su-error-text">{errors.qualification}</small>
              )}
            </div>

            <div className="su-form-group">
              <label htmlFor="su-interests">Areas of Interest</label>

              <div className="su-custom-interest-input">
                <input
                  type="text"
                  id="su-interests"
                  value={manualInterest}
                  onChange={(e) => setManualInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomInterest();
                    }
                  }}
                  placeholder="Type an interest and press Enter"
                  className={errors.interests ? "su-input-error" : ""}
                />
                <button
                  type="button"
                  className="su-add-interest-btn"
                  onClick={handleAddCustomInterest}
                  disabled={!manualInterest.trim()}
                >
                  Add
                </button>
              </div>

              {errors.interests && (
                <small className="su-error-text">{errors.interests}</small>
              )}

              <div className="su-interests-container">
                <h4>Select your interests:</h4>
                <div className="su-interests-list">
                  {suggestedInterests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      className={`su-interest-btn ${
                        values.interests.includes(interest) ? "su-active" : ""
                      }`}
                      onClick={() => handleToggleInterest(interest)}
                    >
                      {interest}
                      {values.interests.includes(interest)}
                    </button>
                  ))}

                  {values.interests
                    .filter(
                      (interest) => !suggestedInterests.includes(interest)
                    )
                    .map((interest, index) => (
                      <button
                        key={`custom-${index}`}
                        type="button"
                        className="su-interest-btn su-active su-custom"
                        onClick={() => handleToggleInterest(interest)}
                      >
                        {interest}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="su-form-group">
              <label htmlFor="su-password">Password *</label>
              <input
                type="password"
                id="su-password"
                name="password"
                placeholder="Create a strong password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.password ? "su-input-error" : ""}
              />
              {errors.password && (
                <small className="su-error-text">{errors.password}</small>
              )}
            </div>

            <div className="su-form-group">
              <label htmlFor="su-confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="su-confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.confirmPassword ? "su-input-error" : ""}
              />
              {errors.confirmPassword && (
                <small className="su-error-text">{errors.confirmPassword}</small>
              )}
            </div>
          </>
        )}

        <div className="su-button-group">
          {step > 0 && (
            <button
              className="su-btn-secondary"
              onClick={handlePrev}
              type="button"
            >
              Previous
            </button>
          )}
          <button className="su-btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <div className="su-loader"></div>
            ) : step === stepFields.length - 1 ? (
              "Create Account"
            ) : (
              "Next"
            )}
          </button>
        </div>
      </form>

      <div className="su-signin-text">
        Already have an account?{" "}
        <Link to="/login" className="su-signin-link">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;


