import { JSX } from "react";
import { NavBarProps } from "../types";
import { MODES } from "../constants";

const NavBar = ({ setMode }: NavBarProps): JSX.Element => {
  return (
    <nav className="mb-5 p-4 round-border">
      <button
        onClick={() => setMode(MODES.BUILDER)}
        className="btn btn-primary me-2"
      >
        Build Form
      </button>

      <button onClick={() => setMode(MODES.VIEWER)} className="btn btn-success">
        View Form
      </button>
    </nav>
  );
};

export default NavBar;
