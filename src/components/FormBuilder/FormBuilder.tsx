import React, { JSX, useState } from "react";
import { createForm } from "../../api/endpoints";
import {
  FormBuilderProps,
  FieldDefinition,
  FieldsMap,
  FormResponse,
} from "../../types";
import { MODES } from "../../constants";

const FormBuilder = ({
  setForm,
  switchMode,
}: FormBuilderProps): JSX.Element => {
  const [formName, setFormName] = useState<string>("");
  const [fieldList, setFieldList] = useState<FieldDefinition[]>([]);
  const [currentField, setCurrentField] = useState<Omit<FieldDefinition, "id">>(
    {
      type: "text",
      question: "",
      required: false,
    },
  );

  const addField = () => {
    if (!currentField.question.trim()) return;

    const newField: FieldDefinition = {
      id: `field-${fieldList.length + 1}`,
      ...currentField,
    };

    setFieldList([...fieldList, newField]);
    setCurrentField({ type: "text", question: "", required: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const fieldsMap: FieldsMap = Object.fromEntries(
      fieldList.map((field) => [
        field.id,
        {
          type: field.type,
          question: field.question,
          required: field.required,
        },
      ]),
    ) as FieldsMap;

    try {
      const response = await createForm({ name: formName, fields: fieldsMap });
      const createdForm: FormResponse = response.data;
      if (!createdForm.fields) createdForm.fields = {};
      setForm(createdForm);
      switchMode(MODES.VIEWER);
    } catch (error) {
      console.error(error);
      alert("Error creating form");
    }
  };

  return (
    <div>
      <h2 className="mb-3">Build Your Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Form Name:</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="form-control"
          />
        </div>
        <hr />
        <h4 className="mb-3">Add Field</h4>
        <div className="mb-3">
          <label className="form-label">Field Type:</label>
          <select
            value={currentField.type}
            onChange={(e) =>
              setCurrentField({
                ...currentField,
                type: e.target.value as "text" | "datetime" | "boolean",
              })
            }
            className="form-select mb-3"
          >
            <option value="text">Text</option>
            <option value="datetime">Datetime</option>
            <option value="boolean">Boolean</option>
          </select>
          <label className="form-label">Question:</label>
          <input
            type="text"
            value={currentField.question}
            onChange={(e) =>
              setCurrentField({ ...currentField, question: e.target.value })
            }
            className="form-control mb-3"
          />
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              checked={currentField.required}
              onChange={(e) =>
                setCurrentField({ ...currentField, required: e.target.checked })
              }
              className="form-check-input"
              id="requiredCheck"
            />
            <label className="form-check-label" htmlFor="requiredCheck">
              Required
            </label>
          </div>
          <button
            type="button"
            onClick={addField}
            className="btn btn-secondary mb-3"
          >
            Add Field
          </button>
        </div>
        <div className="mb-3">
          <h5>Fields List:</h5>
          <ul className="list-group">
            {fieldList.map((field) => (
              <li key={field.id} className="list-group-item">
                {field.id}: {field.type} – {field.question}{" "}
                {field.required ? "(Required)" : ""}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Form
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
