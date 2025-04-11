import { useState } from "react";
import NavBar from "./components/NavBar";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import FormViewer from "./components/FormViewer";
import { MODES, Mode } from "./constants";

function App() {
  const [mode, setMode] = useState<Mode>(MODES.BUILDER);
  const [formId, setFormId] = useState("");

  return (
    <div className="container mt-4">
      <NavBar setMode={setMode} />
      {mode === MODES.BUILDER ? (
        <FormBuilder setFormId={setFormId} switchMode={setMode} />
      ) : (
        <FormViewer formId={formId} />
      )}
    </div>
  );
}

export default App;
