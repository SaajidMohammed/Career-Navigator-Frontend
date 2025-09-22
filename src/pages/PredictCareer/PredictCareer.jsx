import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import predictionService from "../../api/predictionApi.jsx";
import "./PredictCareer.css";

const defaultCategoricalOptions = {
  can_work_long_time_before_system: ["yes", "no"],
  self_learning_capability: ["yes", "no"],
  extra_courses_did: ["yes", "no"],
  talenttests_taken: ["yes", "no"],
  olympiads: ["yes", "no"],
  taken_inputs_from_seniors_or_elders: ["yes", "no"],
  interested_in_games: ["yes", "no"],
  in_a_realtionship: ["yes", "no"],
  worked_in_teams_ever: ["yes", "no"],
  introvert: ["yes", "no"],
  certifications: [
    "none",
    "shell programming",
    "machine learning",
    "app development",
    "python",
    "r programming",
    "information security",
    "hadoop",
    "distro making",
    "full stack",
  ],
  workshops: [
    "none",
    "cloud computing",
    "database security",
    "web technologies",
    "data science",
    "testing",
    "hacking",
    "game development",
    "system designing",
  ],
  reading_and_writing_skills: ["poor", "medium", "excellent"],
  memory_capability_score: ["poor", "medium", "excellent"],
  interested_subjects: [
    "cloud computing",
    "networks",
    "hacking",
    "computer architecture",
    "programming",
    "parallel computing",
    "iot",
    "data engineering",
    "software engineering",
    "management",
  ],
  interested_career_area: [
    "system developer",
    "business process analyst",
    "developer",
    "testing",
    "security",
    "cloud computing",
  ],
  job_or_higher_studies: ["job", "higherstudies"],
  type_of_company_want_to_settle_in: [
    "web services",
    "saas services",
    "sales and marketing",
    "testing and maintainance services",
    "product development",
    "bpa",
    "service based",
    "product based",
    "cloud services",
    "finance",
  ],
  interested_type_of_books: [
    "none",
    "prayer books",
    "childrens",
    "travel",
    "romance",
    "cookbooks",
    "self help",
    "drama",
    "math",
    "religion-spirituality",
    "anthology",
    "trilogy",
    "autobiographies",
    "mystery",
    "diaries",
    "journals",
    "history",
    "art",
    "dictionaries",
    "horror",
    "encyclopedias",
    "action and adventure",
    "fantasy",
    "comics",
    "science fiction",
    "series",
    "guide",
    "biographies",
    "health",
    "satire",
    "science",
    "poetry",
  ],
  gentle_or_tuff_behaviour: ["gentle", "stubborn"],
  management_or_technical: ["management", "technical"],
  salary_work: ["salary", "work"],
  hard_smart_worker: ["hard worker", "smart worker"],
};

const requiredFieldsByStep = [
  [
    "acedamic_percentage_in_operating_systems",
    "percentage_in_algorithms",
    "percentage_in_programming_concepts",
    "percentage_in_software_engineering",
    "percentage_in_computer_networks",
    "percentage_in_electronics_subjects",
    "percentage_in_computer_architecture",
    "percentage_in_mathematics",
    "percentage_in_communication_skills",
  ],
  ["hackathons", "coding_skills_rating", "public_speaking_points", "certifications"],
  Object.keys(defaultCategoricalOptions),
];

const PredictCareerPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    acedamic_percentage_in_operating_systems: null,
    percentage_in_algorithms: null,
    percentage_in_programming_concepts: null,
    percentage_in_software_engineering: null,
    percentage_in_computer_networks: null,
    percentage_in_electronics_subjects: null,
    percentage_in_computer_architecture: null,
    percentage_in_mathematics: null,
    percentage_in_communication_skills: null,
    hours_working_per_day: null,
    logical_quotient_rating: null,
    hackathons: null,
    coding_skills_rating: null,
    public_speaking_points: null,
    can_work_long_time_before_system: "no",
    self_learning_capability: "no",
    extra_courses_did: "no",
    talenttests_taken: "no",
    olympiads: "no",
    taken_inputs_from_seniors_or_elders: "no",
    interested_in_games: "no",
    in_a_realtionship: "no",
    worked_in_teams_ever: "no",
    introvert: "no",
    certifications: "none",
    workshops: "none",
    reading_and_writing_skills: "poor",
    memory_capability_score: "poor",
    interested_subjects: "cloud computing",
    interested_career_area: "system developer",
    job_or_higher_studies: "job",
    type_of_company_want_to_settle_in: "web services",
    interested_type_of_books: "none",
    gentle_or_tuff_behaviour: "gentle",
    management_or_technical: "management",
    salary_work: "salary",
    hard_smart_worker: "hard worker",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === "number") {
      val = value === "" ? null : Number(value);
    } else if (typeof value === "string") {
      val = value.trim().toLowerCase();
    }
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const validateStep = () => {
    const requiredFields = requiredFieldsByStep[step - 1];
    return requiredFields.every((field) => formData[field] !== null && formData[field] !== "");
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    } else {
      alert("Please fill all the fields before proceeding.");
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert("Please log in to get a prediction.");
      navigate("/auth");
      return;
    }
    if (!validateStep()) {
      alert("Please fill all the fields before submitting.");
      return;
    }
    try {
      const response = await predictionService.getPrediction(formData, user.token);
      console.log("Prediction received:", response);
      navigate("/dashboard", { state: { predictionData: response } });
    } catch (error) {
      console.error("Prediction failed:", error.response?.data?.message || error.message);
      alert("Failed to get a prediction. " + (error.response?.data?.message || error.message));
    }
  };
  useEffect(() => {
  console.log("✅ PredictCareer component mounted");
}, []);

  return (
    <div className="predict-career-container">
      <div className="form-card">
        <h2>Career Prediction Form</h2>
        <p>Step {step} of 3</p>
        <form onSubmit={handlePredict}>
          {step === 1 && (
            <>
              <h3>Academic and Basic Info</h3>
              <div className="form-group">
                <label>Academic percentage in Operating Systems</label>
                <input type="number" name="acedamic_percentage_in_operating_systems" value={formData.acedamic_percentage_in_operating_systems || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Algorithms</label>
                <input type="number" name="percentage_in_algorithms" value={formData.percentage_in_algorithms || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Programming Concepts</label>
                <input type="number" name="percentage_in_programming_concepts" value={formData.percentage_in_programming_concepts || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Software Engineering</label>
                <input type="number" name="percentage_in_software_engineering" value={formData.percentage_in_software_engineering || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Computer Networks</label>
                <input type="number" name="percentage_in_computer_networks" value={formData.percentage_in_computer_networks || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Electronics Subjects</label>
                <input type="number" name="percentage_in_electronics_subjects" value={formData.percentage_in_electronics_subjects || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Computer Architecture</label>
                <input type="number" name="percentage_in_computer_architecture" value={formData.percentage_in_computer_architecture || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Mathematics</label>
                <input type="number" name="percentage_in_mathematics" value={formData.percentage_in_mathematics || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage in Communication skills</label>
                <input type="number" name="percentage_in_communication_skills" value={formData.percentage_in_communication_skills || ""} onChange={handleChange} required />
              </div>
              <div className="form-actions">
                <button type="button" onClick={nextStep} className="next-button">Next</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3>Skills and Interests</h3>
              <div className="form-group">
                <label>Hackathons</label>
                <input type="number" name="hackathons" value={formData.hackathons || ""} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Coding skills rating</label>
                <select name="coding_skills_rating" value={formData.coding_skills_rating || ""} onChange={handleChange} required>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Public speaking points</label>
                <select name="public_speaking_points" value={formData.public_speaking_points || ""} onChange={handleChange} required>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Certifications</label>
                <select name="certifications" value={formData.certifications} onChange={handleChange} required>
                  {defaultCategoricalOptions.certifications.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
                <button type="button" onClick={nextStep} className="next-button">Next</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h3>Preferences and Behavior</h3>
              {Object.entries(defaultCategoricalOptions).map(([field, options]) => (
                <div className="form-group" key={field}>
                  <label>{field.split("_").join(" ")}</label>
                  <select name={field} value={formData[field]} onChange={handleChange} required>
                    {options.map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="form-actions">
                <button type="button" onClick={prevStep} className="back-button">Back</button>
                <button type="submit" className="predict-button">Predict Career</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PredictCareerPage;
