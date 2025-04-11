import { useState } from "react";
import NavBar from "./components/NavBar";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import FormViewer from "./components/FormViewer";
import { MODES, Mode } from "./constants";
import { FormResponse } from "./types";

function App() {
  const [mode, setMode] = useState<Mode>(MODES.BUILDER);
  const [currentForm, setCurrentForm] = useState<FormResponse | null>(null);

  return (
    <div className="container mt-4">
      <NavBar setMode={setMode} />
      {mode === MODES.BUILDER ? (
        <FormBuilder setForm={setCurrentForm} switchMode={setMode} />
      ) : (
        <FormViewer form={currentForm} />
      )}
    </div>
  );
}

export default App;
