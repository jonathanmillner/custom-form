import { API_BASE_URL } from "../constants";

async function getForm(formId: string) {
  const res = await fetch(`${API_BASE_URL}/form/${formId}`);
  if (!res.ok) throw new Error("Failed to fetch form");
  return res.json();
}

async function createForm(data: {
  name: string;
  fields: Record<string, any>;
}) {
  const res = await fetch(`${API_BASE_URL}/form`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create form");
  return res.json();
}

async function createSourceRecord(data: {
  formId: string;
  sourceData: { question: string; answer: string }[];
}) {
  const res = await fetch(`${API_BASE_URL}/source-records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit source record");
  return res.json();
}

export { getForm, createForm, createSourceRecord };
