import { Dispatch, SetStateAction } from "react";
import { Mode } from "../constants";

interface NavBarProps {
  setMode: Dispatch<SetStateAction<Mode>>;
}

interface FormBuilderProps {
  setFormId: (id: string) => void;
  switchMode: Dispatch<SetStateAction<Mode>>;
}

interface FormViewerProps {
  formId: string;
}

interface FormData {
  name: string;
  fields: FieldsMap;
}

interface FormResponse {
  id: string;
  name: string;
  fields: {
    [key: string]: {
      type: "text" | "datetime" | "boolean";
      question: string;
      required: boolean;
    };
  };
}

interface FieldDefinition {
  id: string;
  type: "text" | "datetime" | "boolean";
  question: string;
  required: boolean;
}

interface FieldsMap {
  [key: string]: Omit<FieldDefinition, "id">;
}

export type {
  NavBarProps,
  FormBuilderProps,
  FormViewerProps,
  FormData,
  FormResponse,
  FieldDefinition,
  FieldsMap,
};
