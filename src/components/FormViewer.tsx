import React, { JSX, useEffect, useState } from "react";
import { getForm, createSourceRecord } from "../api/endpoints";
import { FormViewerProps, FormResponse } from "../types";

type FormData = Record<string, any>;

const FormViewer = ({ formId }: FormViewerProps): JSX.Element => {
  const [form, setForm] = useState<FormResponse | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    async function fetchForm() {
      if (formId) {
        try {
          const data = await getForm(formId);
          setForm(data);
        } catch (error) {
          console.error("Error fetching form", error);
        }
      }
    }
    fetchForm();
  }, [formId]);

  const handleChange = (fieldKey: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const sourceData = Object.entries(form.fields).map(([key, field]) => {
      let answer = formData[key];
      if (field.type === "boolean") answer = answer ? "true" : "false";
      return { question: field.question, answer: answer || "" };
    });
    try {
      await createSourceRecord({ formId: form.id, sourceData });
      alert("Form submitted successfully.");
      setFormData({});
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  if (!form) return <div>No form loaded.</div>;

  return (
    <div>
      <h2 className="mb-3">{form.name}</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form.fields).map(([key, field]) => (
          <div className="mb-3" key={key}>
            <label className="form-label">
              {field.question} {field.required && "*"}
            </label>
            {field.type === "text" && (
              <input
                type="text"
                value={formData[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="form-control"
              />
            )}
            {field.type === "datetime" && (
              <input
                type="datetime-local"
                value={formData[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="form-control"
              />
            )}
            {field.type === "boolean" && (
              <div className="form-check">
                <input
                  type="checkbox"
                  checked={formData[key] || false}
                  onChange={(e) => handleChange(key, e.target.checked)}
                  className="form-check-input"
                  id={`check-${key}`}
                />
                <label className="form-check-label" htmlFor={`check-${key}`}>
                  Yes
                </label>
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default FormViewer;
