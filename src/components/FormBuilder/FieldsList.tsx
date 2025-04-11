import { JSX } from "react";
import { FieldDefinition } from "../../types";

interface FieldsListProps {
  fieldList: FieldDefinition[];
}

const FieldsList = ({ fieldList }: FieldsListProps): JSX.Element => {
  return (
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
  );
};

export default FieldsList;
