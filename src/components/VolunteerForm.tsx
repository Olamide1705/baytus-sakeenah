import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of your form data using a TypeScript Interface
interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  gender: string;
  ageGroup: string;
  teamInterest: string[]; // Stores all selected teams
  primaryInterest: string; // Stores the single primary interest for conditional logic
  motivation: string;
  consent: boolean;
  // Conditional fields - these will be conditionally rendered and their values stored here
  contentSkills?: string;
  writingSamples?: string;
  designSoftware?: string;
  designPortfolio?: string;
  techLanguages?: string;
  techDatabases?: string;
  techGithub?: string;
  prExperience?: string;
  moderationExperience?: string;
  otherSkills?: string;
  yearsExperience: string;
  islamicValues?: string;
  challenges?: string;
  howDidYouHear?: string;
}

// Define the shape of your error messages
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  country?: string;
  gender?: string;
  ageGroup?: string;
  teamInterest?: string;
  primaryInterest?: string;
  motivation?: string;
  consent?: string;
  contentSkills?: string;
  writingSamples?: string;
  designSoftware?: string;
  designPortfolio?: string;
  techLanguages?: string;
  techDatabases?: string;
  techGithub?: string;
  prExperience?: string;
  moderationExperience?: string;
  otherSkills?: string;
  yearsExperience?: string;
  general?: string;
  islamicValues?: string;
  challenges?: string;
  howDidYouHear?: string;
}

const VolunteerForm: React.FC = () => {
  // Initialize form data with default empty values
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    gender: "",
    ageGroup: "",
    teamInterest: [],
    primaryInterest: "",
    motivation: "",
    consent: false,
    yearsExperience: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State to manage the current step/section of the form
  const [currentStep, setCurrentStep] = useState<number>(1);
  // State for loading indicator during submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // State for submission success message
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Handle changes for all input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // Special handling for checkbox inputs for teamInterest
    if (type === "checkbox" && name === "teamInterest") {
      const updatedTeams = checked
        ? [...formData.teamInterest, value]
        : formData.teamInterest.filter((team) => team !== value);
      setFormData({
        ...formData,
        teamInterest: updatedTeams,
      });
    } else if (type === "checkbox") {
      // For other checkboxes like consent
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      // For all other input types
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // Clear the error for the changed field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  // Basic form validation function for the current step
  const validateForm = (step: number): boolean => {
    const currentErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      // Validation for Basic Information & Interest
      if (!formData.fullName.trim()) {
        currentErrors.fullName = "Full Name is required.";
        isValid = false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        currentErrors.email = "Valid Email Address is required.";
        isValid = false;
      }
      if (!formData.phone.trim()) {
        currentErrors.phone = "Phone Number is required.";
        isValid = false;
      }
      if (!formData.location.trim()) {
        currentErrors.location = "City & State is required.";
        isValid = false;
      }
      if (!formData.gender) {
        currentErrors.gender = "Gender is required.";
        isValid = false;
      }
      if (!formData.ageGroup) {
        currentErrors.ageGroup = "Age Group is required.";
        isValid = false;
      }
      if (formData.teamInterest.length === 0) {
        currentErrors.teamInterest = "Please select at least one team.";
        isValid = false;
      }
      if (!formData.primaryInterest && formData.teamInterest.length > 0) {
        currentErrors.primaryInterest = "Please select your primary interest.";
        isValid = false;
      }
    } else if (step === 2) {
      // Validation for Skills & Experience
      if (!formData.yearsExperience) {
        currentErrors.yearsExperience = "Years of Experience is required.";
        isValid = false;
      }
      // Conditional validation based on primary interest
      if (formData.primaryInterest === "Content Creation") {
        if (!formData.contentSkills?.trim()) {
          currentErrors.contentSkills = "Please describe your content skills.";
          isValid = false;
        }
        if (!formData.writingSamples?.trim()) {
          currentErrors.writingSamples = "Please provide writing samples.";
          isValid = false;
        }
      } else if (formData.primaryInterest === "Design") {
        if (!formData.designSoftware?.trim()) {
          currentErrors.designSoftware = "Please list design software you use.";
          isValid = false;
        }
        if (!formData.designPortfolio?.trim()) {
          currentErrors.designPortfolio = "Please provide a portfolio link.";
          isValid = false;
        }
      } else if (formData.primaryInterest === "Tech/Development") {
        if (!formData.techLanguages?.trim()) {
          currentErrors.techLanguages = "Please list programming languages.";
          isValid = false;
        }
        if (!formData.techGithub?.trim()) {
          currentErrors.techGithub =
            "Please provide your GitHub profile or project links.";
          isValid = false;
        }
      } else if (formData.primaryInterest === "Public Relations") {
        if (!formData.prExperience?.trim()) {
          currentErrors.prExperience = "Please describe your PR experience.";
          isValid = false;
        }
      } else if (
        formData.primaryInterest === "Moderation/Community Management"
      ) {
        if (!formData.moderationExperience?.trim()) {
          currentErrors.moderationExperience =
            "Please describe your moderation experience.";
          isValid = false;
        }
      } else if (formData.primaryInterest === "Other") {
        if (!formData.otherSkills?.trim()) {
          currentErrors.otherSkills = "Please specify your other skills.";
          isValid = false;
        }
      }
    } else if (step === 3) {
      // Validation for Understanding & Alignment
      if (!formData.motivation.trim()) {
        currentErrors.motivation = "Your motivation is required.";
        isValid = false;
      }
      if (!formData.consent) {
        currentErrors.consent = "You must agree to the terms.";
        isValid = false;
      }
    }

    setErrors(currentErrors);
    return isValid;
  };

  // Navigate to the next step
  const nextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // Optionally show errors for step 1
      console.log("Step 1 validation failed", errors);
    }
  };

  // Navigate to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validate the current (last) step before final submission
    if (validateForm(currentStep)) {
      setIsSubmitting(true);
      setErrors({}); // Clear any previous errors

      try {
        const GOOGLE_APPS_SCRIPT_WEB_APP_URL =
          "https://script.google.com/macros/s/AKfycby7yNxUs4z34Vd3_Szl98Bu4MScIh7PxeMbf3_KN0JBYcFC9YGO7RRE_rKvDDt10iXK/exec";

        const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Send as JSON
          },
          body: JSON.stringify(formData), // Convert formData object to JSON string
        });

        if (!response.ok) {
          // Attempt to parse error message from server if available
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Form submission failed on the server."
          );
        }

        const result = await response.json(); // Get the JSON response from Apps Script
        if (result.status === "ERROR") {
          throw new Error(
            result.message || "Form submission failed with an unknown error."
          );
        }

        console.log("Form data submitted:", formData);
        console.log("Server response:", result);

        setSubmissionSuccess(true); // Indicate success
        setFormData({
          // Reset form for new submission
          fullName: "",
          email: "",
          phone: "",
          location: "",
          country: "",
          gender: "",
          ageGroup: "",
          teamInterest: [],
          primaryInterest: "",
          motivation: "",
          consent: false,
          yearsExperience: "",
          islamicValues: "",
          challenges: "",
          howDidYouHear: "",
        });
        setCurrentStep(1); // Go back to first step after success
      } catch (error) {
        // Use 'any' for error type if not specific
        console.error("Submission error:", error);
        // Display a general error message to the user
        setErrors({
          general:
            "There was an error submitting your application. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Utility class for common input styles
  const inputClassName = `form-input flex w-full px-4 mt-1 mb-8 rounded-lg text-teal-900 border border-teal-200 focus:ring-teal-500 focus:border-teal-500 h-[50px] !py-1`;

  return (
    <section id="volunteer">
      <div className="min-h-screen flex items-center justify-center p-4 mb-8">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl py-6 px-4 md:p-8 space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-emerald-800/90 mb-8">
            Join Our Team
          </h2>

          {submissionSuccess ? (
            <div className="text-center p-6 bg-teal-50 border border-teal-200 rounded-lg">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Jazakallahu Khoyron! 🎉
              </h2>
              <p className="text-teal-800">
                Your application has been successfully submitted. We appreciate
                your interest and will get back to you soon.
              </p>
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="mt-6 bg-teal-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Apply Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Basic Information & Interest */}
              {currentStep === 1 && (
                <div className="px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
                    Step 1: Your Details & Interest
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Let's start with some basic information about you and your
                    areas of interest.
                  </p>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                      placeholder="e.g. Adam Suleiman"
                    />
                    {errors.fullName && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="e.g. your@email.com"
                    />
                    {errors.email && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Phone Number (WhatsApp preferred){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="e.g. +2348012345678"
                    />
                    {errors.phone && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City, State & Country */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Current City & State{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.location ? "border-red-500" : ""
                      }`}
                      placeholder="e.g. Lagos, Lagos State"
                    />
                    {errors.location && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Your Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.gender ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  {/* Age Group */}
                  <div>
                    <label
                      htmlFor="ageGroup"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Age Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ageGroup"
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.ageGroup ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select your age group</option>
                      <option value="18-24">18-24</option>
                      <option value="25-35">25-35</option>
                      <option value="36-45">36-45</option>
                      <option value="46-55">46-55</option>
                      <option value="56+">56+</option>
                    </select>
                    {errors.ageGroup && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.ageGroup}
                      </p>
                    )}
                  </div>

                  {/* Team Interest - Checkboxes */}
                  <div>
                    <label className="block text-teal-900 font-medium mb-2">
                      Which Team(s) are you interested in joining?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col space-y-2">
                      {[
                        "Content Creation",
                        "Design",
                        "Public Relations",
                        "Tech/Development",
                        "Marketing/Growth",
                        "Moderation/Community Management",
                        "Mentorship Program Support",
                        "Research & Data Analysis",
                        "Other",
                      ].map((team) => (
                        <label key={team} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="teamInterest"
                            value={team}
                            checked={formData.teamInterest.includes(team)}
                            onChange={handleChange}
                            className="form-checkbox text-teal-600 rounded-md"
                          />
                          <span className="ml-2 text-teal-900">{team}</span>
                        </label>
                      ))}
                    </div>
                    {errors.teamInterest && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.teamInterest}
                      </p>
                    )}
                  </div>

                  {/* Primary Interest - Dropdown (for conditional logic) */}
                  {formData.teamInterest.length > 0 && (
                    <div>
                      <label
                        htmlFor="primaryInterest"
                        className="block text-teal-900 font-medium mt-4 mb-2"
                      >
                        From your selections above, which team is your *primary*
                        interest? <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="primaryInterest"
                        name="primaryInterest"
                        value={formData.primaryInterest}
                        onChange={handleChange}
                        className={`${inputClassName} ${
                          errors.primaryInterest ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select your top choice</option>
                        {formData.teamInterest.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                      {errors.primaryInterest && (
                        <p className="mb-5 text-red-600 text-sm">
                          {errors.primaryInterest}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={nextStep}
                    className="button-primary inline-flex items-center justify-center gap-2 mt-6 w-full"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 2: Skills & Experience */}
              {currentStep === 2 && (
                <div className="px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
                    Step 2: Your Skills & Experience
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Tell us more about your relevant experience for your chosen
                    team.
                  </p>

                  {/* Years of Experience */}
                  <div>
                    <label
                      htmlFor="yearsExperience"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Years of professional or significant volunteer experience{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="yearsExperience"
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      className={`${inputClassName} ${
                        errors.yearsExperience ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select years</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                    {errors.yearsExperience && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.yearsExperience}
                      </p>
                    )}
                  </div>

                  {/* Conditional Fields based on Primary Interest */}
                  {formData.primaryInterest === "Content Creation" && (
                    <>
                      <div>
                        <label
                          htmlFor="contentSkills"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Please describe your content creation skills.{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="contentSkills"
                          name="contentSkills"
                          value={formData.contentSkills || ""}
                          onChange={handleChange}
                          className={`${inputClassName} h-24 ${
                            errors.contentSkills ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., SEO writing, storytelling, editing, proofreading..."
                        ></textarea>
                        {errors.contentSkills && (
                          <p className="mb-5 text-red-600 text-sm">
                            {errors.contentSkills}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="writingSamples"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Please provide links to your writing
                          samples/portfolio.{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="writingSamples"
                          name="writingSamples"
                          value={formData.writingSamples || ""}
                          onChange={handleChange}
                          className={`${inputClassName} ${
                            errors.writingSamples ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., yourwebsite.com/articles or drive.google.com/..."
                        />
                        {errors.writingSamples && (
                          <p className="mb-5 text-red-600 text-sm">
                            {errors.writingSamples}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formData.primaryInterest === "Design" && (
                    <>
                      <div>
                        <label
                          htmlFor="designSoftware"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Which design software/tools do you use?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="designSoftware"
                          name="designSoftware"
                          value={formData.designSoftware || ""}
                          onChange={handleChange}
                          className={`${inputClassName} ${
                            errors.designSoftware ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., Figma, Adobe Photoshop, Illustrator, Canva"
                        />
                        {errors.designSoftware && (
                          <p className="mb-5 text-red-600 text-sm">
                            {errors.designSoftware}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="designPortfolio"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Please provide a link to your design portfolio.{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="designPortfolio"
                          name="designPortfolio"
                          value={formData.designPortfolio || ""}
                          onChange={handleChange}
                          className={`${inputClassName} ${
                            errors.designPortfolio ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., behance.net/yourname or yourportfolio.com"
                        />
                        {errors.designPortfolio && (
                          <p className="mb-5 text-red-600 text-sm">
                            {errors.designPortfolio}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formData.primaryInterest === "Tech/Development" && (
                    <>
                      <div>
                        <label
                          htmlFor="techLanguages"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Which programming languages/frameworks are you
                          proficient in? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="techLanguages"
                          name="techLanguages"
                          value={formData.techLanguages || ""}
                          onChange={handleChange}
                          className={`${inputClassName} ${
                            errors.techLanguages ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., JavaScript, React, Python, Node.js, Firebase"
                        />
                        {errors.techLanguages && (
                          <p className="mt-1 text-red-600 text-sm">
                            {errors.techLanguages}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="techGithub"
                          className="block text-teal-900 font-medium mb-2"
                        >
                          Please provide your GitHub profile or relevant project
                          links. <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="techGithub"
                          name="techGithub"
                          value={formData.techGithub || ""}
                          onChange={handleChange}
                          className={`${inputClassName} ${
                            errors.techGithub ? "border-red-500" : ""
                          }`}
                          placeholder="e.g., github.com/yourusername or link to a deployed project"
                        />
                        {errors.techGithub && (
                          <p className="mb-5 text-red-600 text-sm">
                            {errors.techGithub}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formData.primaryInterest === "Public Relations" && (
                    <div>
                      <label
                        htmlFor="prExperience"
                        className="block text-teal-900 font-medium mb-2"
                      >
                        Please describe your experience in Public Relations or
                        Community Outreach.{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="prExperience"
                        name="prExperience"
                        value={formData.prExperience || ""}
                        onChange={handleChange}
                        className={`${inputClassName} h-24 ${
                          errors.prExperience ? "border-red-500" : ""
                        }`}
                        placeholder="e.g., social media management, partnership building, event coordination..."
                      ></textarea>
                      {errors.prExperience && (
                        <p className="mb-5 text-red-600 text-sm">
                          {errors.prExperience}
                        </p>
                      )}
                    </div>
                  )}

                  {formData.primaryInterest ===
                    "Moderation/Community Management" && (
                    <div>
                      <label
                        htmlFor="moderationExperience"
                        className="block text-teal-900 font-medium mb-2"
                      >
                        Please describe your experience with online moderation
                        or community management.{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="moderationExperience"
                        name="moderationExperience"
                        value={formData.moderationExperience || ""}
                        onChange={handleChange}
                        className={`${inputClassName} h-24 ${
                          errors.moderationExperience ? "border-red-500" : ""
                        }`}
                        placeholder="e.g., forum moderation, conflict resolution, user support..."
                      ></textarea>
                      {errors.moderationExperience && (
                        <p className="mb-5 text-red-600 text-sm">
                          {errors.moderationExperience}
                        </p>
                      )}
                    </div>
                  )}

                  {formData.primaryInterest === "Other" && (
                    <div>
                      <label
                        htmlFor="otherSkills"
                        className="block text-teal-900 font-medium mb-2"
                      >
                        Please specify your other skills and how they relate to
                        Baytul-Sakinah. <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="otherSkills"
                        name="otherSkills"
                        value={formData.otherSkills || ""}
                        onChange={handleChange}
                        className={`${inputClassName} h-24 ${
                          errors.otherSkills ? "border-red-500" : ""
                        }`}
                        placeholder="Describe your skills here..."
                      ></textarea>
                      {errors.otherSkills && (
                        <p className="mb-5 text-red-600 text-sm">
                          {errors.otherSkills}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-300 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="button-primary inline-flex items-center justify-center gap-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Understanding & Alignment */}
              {currentStep === 3 && (
                <div className="px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
                    Step 3: Understanding & Alignment
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Help us understand your connection to our mission and
                    values.
                  </p>

                  {/* Motivation */}
                  <div>
                    <label
                      htmlFor="motivation"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      What is your primary motivation for joining with
                      Baytul-Sakinah? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      className={`w-full mb-3 form-input px-5 py-3 rounded-lg text-teal-900 border border-teal-200 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.motivation ? "border-red-500" : ""
                      }`}
                      placeholder="Tell us what resonates with you about our mission to reduce divorce rates and foster stronger Muslim marriages."
                    ></textarea>
                    {errors.motivation && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.motivation}
                      </p>
                    )}
                  </div>

                  {/* Islamic Values Alignment */}
                  <div>
                    <label
                      htmlFor="islamicValues"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      Baytul-Sakinah upholds Islamic values (e.g., modesty,
                      privacy, no gossip). How do you envision contributing to
                      and upholding these values?
                    </label>
                    <textarea
                      id="islamicValues"
                      name="islamicValues"
                      value={formData.islamicValues || ""} // Assuming you'd add this to FormData interface
                      onChange={handleChange}
                      className={`w-full mb-3 form-input px-5 py-3 rounded-lg text-teal-900 border border-teal-200 focus:ring-teal-500 focus:border-teal-500`}
                      placeholder="Share your thoughts here..."
                    ></textarea>
                  </div>

                  {/* Challenges for Young Muslim Couples */}
                  <div>
                    <label
                      htmlFor="challenges"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      What do you believe are some of the biggest challenges
                      facing young Muslim couples in Nigeria today, and how do
                      you think Baytul-Sakinah can help address them?
                    </label>
                    <textarea
                      id="challenges"
                      name="challenges"
                      value={formData.challenges || ""} // Assuming you'd add this to FormData interface
                      onChange={handleChange}
                      className={`w-full mb-3 form-input px-5 py-3 rounded-lg text-teal-900 border border-teal-200 focus:ring-teal-500 focus:border-teal-500`}
                      placeholder="Your insights are valuable..."
                    ></textarea>
                  </div>

                  {/* How did you hear about us? */}
                  <div>
                    <label
                      htmlFor="howDidYouHear"
                      className="block text-teal-900 font-medium mb-2"
                    >
                      How did you hear about Baytul-Sakinah?
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear || ""} // Assuming you'd add this to FormData interface
                      onChange={handleChange}
                      className={`${inputClassName}`}
                    >
                      <option value="">Select an option</option>
                      <option value="Social Media">
                        Social Media (Facebook, Instagram, etc.)
                      </option>
                      <option value="Friend/Family">Friend/Family</option>
                      <option value="Mosque/Islamic Organization">
                        Mosque/Islamic Organization
                      </option>
                      <option value="Online Search">Online Search</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="mt-6">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="form-checkbox text-teal-600 rounded-md"
                      />
                      <span className="ml-2 text-teal-900">
                        I confirm that the information provided in this
                        application is accurate and true to the best of my
                        knowledge. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mb-5 text-red-600 text-sm">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {errors.general && (
                    <p className="mt-4 text-red-600 text-center">
                      {errors.general}
                    </p>
                  )}

                  <div className="flex flex-col md:flex-row gap-5 justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-300 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="button-primary inline-flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default VolunteerForm;
