import { JSX } from "react";
import { FieldDefinition } from "../../types";

interface FieldFormProps {
  currentField: Omit<FieldDefinition, "id">;
  setCurrentField: (field: Omit<FieldDefinition, "id">) => void;
  addField: () => void;
}

const FieldForm = ({
  currentField,
  setCurrentField,
  addField,
}: FieldFormProps): JSX.Element => {
  return (
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
  );
};

export default FieldForm;
