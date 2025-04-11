import { ENDPOINTS } from "./endpoints";

async function createForm(data: { name: string; fields: Record<string, any> }) {
  const res = await fetch(ENDPOINTS.FORM, {
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
  const res = await fetch(ENDPOINTS.SOURCE_RECORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit source record");
  return res.json();
}

export { createForm, createSourceRecord };
