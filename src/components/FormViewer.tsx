import { JSX, useState, FormEvent } from "react";
import { createSourceRecord } from "../api";
import { FormViewerProps } from "../types";

type FormData = Record<string, string | boolean>;

const FormViewer = ({ form }: FormViewerProps): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({});
  const [savedData, setSavedData] = useState<
    { question: string; answer: string }[]
  >([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!form) return <div>No form loaded.</div>;

  const handleChange = (fieldKey: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const sourceData = Object.entries(form.fields ?? {}).map(([key, field]) => {
      let answer = formData[key];

      if (field.type === "boolean") {
        answer = answer ? "true" : "false";
      }

      return {
        question: field.question,
        answer: answer ? String(answer) : "",
      };
    });

    try {
      await createSourceRecord({ formId: form.id, sourceData });

      setSavedData(sourceData);
      setErrorMessage("");
      setFormData({});
      setSuccessMessage("Form data was saved successfully!");
    } catch (error) {
      console.error(error);

      setSavedData([]);
      setSuccessMessage("");
      setErrorMessage(
        "Failed to save form data: " +
          (error instanceof Error ? error.message : ""),
      );
    }
  };

  return (
    <div className="form-viewer">
      <h2 className="mb-3">{form.name}</h2>

      <form onSubmit={handleSubmit}>
        {Object.entries(form.fields ?? {}).map(([key, field]) => (
          <div
            className={`mb-3 ${field.type === "boolean" ? "d-flex align-items-center gap-3" : ""}`}
            key={key}
          >
            <label className="form-label">
              {field.question} {field.required && "*"}
            </label>

            {field.type === "text" && (
              <div>
                <label className="form-label small">Answer:</label>
                <input
                  type="text"
                  value={
                    typeof formData[key] === "boolean"
                      ? ""
                      : formData[key] || ""
                  }
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="form-control"
                  placeholder="Enter your answer"
                />
              </div>
            )}

            {field.type === "datetime" && (
              <div>
                <label className="form-label small">Answer:</label>
                <input
                  type="datetime-local"
                  value={
                    typeof formData[key] === "boolean"
                      ? ""
                      : formData[key] || ""
                  }
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="form-control"
                />
              </div>
            )}

            {field.type === "boolean" && (
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={formData[key] === true}
                  onChange={(e) => handleChange(key, e.target.checked)}
                  className="form-check-input"
                  id={`checkbox-${key}`}
                />
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-success">
          Submit Form
        </button>
      </form>

      <div className="generated-data-messages">
        <div className="mt-4">
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>

        {savedData.length > 0 && (
          <div className="mt-2">
            <h5>Saved Data</h5>

            <ul className="list-group">
              {savedData.map((entry, idx) => (
                <li key={idx} className="list-group-item">
                  <strong>{entry.question}</strong>:{" "}
                  {entry.answer || "(no answer)"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormViewer;
