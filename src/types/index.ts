import { Dispatch, SetStateAction } from "react";
import { Mode } from "../constants";

interface NavBarProps {
  setMode: Dispatch<SetStateAction<Mode>>;
}

interface FormBuilderProps {
  setForm: (form: FormResponse) => void
  switchMode: Dispatch<SetStateAction<Mode>>
}

interface FieldsMap {
  [key: string]: Omit<FieldDefinition, "id">;
}

interface FormResponse {
  id: string;
  name: string;
  fields: FieldsMap;
}

interface FormViewerProps {
  form: FormResponse | null;
}

interface FieldDefinition {
  id: string
  type: 'text' | 'datetime' | 'boolean'
  question: string
  required: boolean
}

export type {
  NavBarProps,
  FormBuilderProps,
  FormViewerProps,
  FormResponse,
  FieldDefinition,
  FieldsMap,
};
