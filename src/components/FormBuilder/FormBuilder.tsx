import React, { JSX, useState } from "react";
import { createForm } from "../../api/endpoints.ts";
import { FormBuilderProps, FieldDefinition, FieldsMap } from "../../types";
import { MODES } from "../../constants";
import FieldForm from "./FieldForm.tsx";
import FieldsList from "./FieldsList.tsx";

const FormBuilder = ({
  setFormId,
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

    const fieldsMap: FieldsMap = fieldList.reduce((acc, field) => {
      acc[field.id] = {
        type: field.type,
        question: field.question,
        required: field.required,
      };
      return acc;
    }, {} as FieldsMap);

    try {
      const createdForm = await createForm({
        name: formName,
        fields: fieldsMap,
      });
      setFormId(createdForm.id);
      switchMode(MODES.VIEWER);
    } catch (error) {
      console.error(error);
      alert("Error creating form");
    }
  };

  return (
    <div className="container-fluid">
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

        <FieldForm
          currentField={currentField}
          setCurrentField={setCurrentField}
          addField={addField}
        />

        <FieldsList fieldList={fieldList} />

        <button type="submit" className="btn btn-primary">
          Create Form
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
