import { FieldsMap, FieldDefinition } from "../types";

export function arrayToFieldsMap(fields: FieldDefinition[]): FieldsMap {
  return fields.reduce((acc, { id, type, question, required }) => {
    acc[id] = { type, question, required };
    return acc;
  }, {} as FieldsMap);
}
