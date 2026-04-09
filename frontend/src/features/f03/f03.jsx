import "./f03.css";
import { useState } from "react";

export default function F03() {
  const [values, setValues] = useState({
    communication: 50,
    technical: 50,
    teamwork: 50,
    leadership: 50,
    problemSolving: 50,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ SMART DESCRIPTION
  const getDescription = (key, val) => {
    const map = {
      communication: [
        "Struggles to communicate clearly",
        "Can explain ideas in most situations",
        "Excellent communicator and presenter",
      ],
      technical: [
        "Basic technical understanding",
        "Comfortable with core concepts",
        "Strong technical expertise",
      ],
      teamwork: [
        "Prefers working alone",
        "Collaborates when needed",
        "Excellent team player",
      ],
      leadership: [
        "Avoids leadership roles",
        "Can lead small tasks",
        "Strong leadership presence",
      ],
      problemSolving: [
        "Needs help solving problems",
        "Solves common problems",
        "Excellent analytical thinker",
      ],
    };

    if (val < 30) return map[key][0];
    if (val < 70) return map[key][1];
    return map[key][2];
  };

  // ✅ SCORE
  const getScore = () => {
    const vals = Object.values(values);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  };

  // ✅ SUBMIT
  const submitData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/f03", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
    } catch (err) {
      alert("Backend not running ❌");
    }
  };

  return (
    <div className="f03-container">
      <h1>Ability Input Module</h1>

      {submitted ? (
        <div className="success">
          🎉 Data submitted successfully!
          <p>Score: {getScore()} / 100</p>
        </div>
      ) : (
        <>
          {Object.keys(values).map((key) => (
            <div key={key} className="slider-box">
              
              <label>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={values[key]}
                onChange={(e) =>
                  handleChange(key, Number(e.target.value))
                }
              />

              <p>
                {values[key]} — {getDescription(key, values[key])}
              </p>
            </div>
          ))}

          {/* ✅ SCORE DISPLAY */}
          <div className="summary">
            <h3>Overall Score: {getScore()} / 100</h3>
          </div>

          <button onClick={submitData}>Submit</button>
        </>
      )}
    </div>
  );
}