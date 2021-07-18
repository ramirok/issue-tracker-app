import { useState } from "react";
import BugModel from "../../../Models/bugModel";
import { Bug } from "../../../utils/types";

type Props = {
  title: string;
  bug: Bug | null;
  close?: () => void;
};

const BugForm = (props: Props): JSX.Element => {
  const bug = BugModel(props.bug);
  const [bugObject, setBugObject] = useState(
    bug
      ? bug
      : {
          name: "",
          details: "",
          steps: "",
          priority: 0,
          assigned: "",
          version: "",
        }
  );

  const inputChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setBugObject((prevState) => ({ ...prevState, ...newState }));
  };
  return (
    <div>
      {props.title === "Edit" && <button onClick={props.close}>Close</button>}
      <h1>{props.title}</h1>
      <form>
        <label>Name:</label>
        <input
          name="name"
          placeholder="Bug Name"
          required
          onChange={inputChange}
          value={bugObject.name}
        ></input>
        <label>Details:</label>
        <textarea
          name="details"
          placeholder="Detailed description on the bug."
          required
          onChange={inputChange}
          value={bugObject.details}
        ></textarea>
        <label>Steps:</label>
        <textarea
          name="steps"
          placeholder="Steps to recreate the bug"
          required
          onChange={inputChange}
          value={bugObject.steps}
        ></textarea>
        <label>Priority:</label>
        <select
          name="priority"
          required
          onChange={inputChange}
          value={bugObject.priority}
        >
          <option value="1">High</option>
          <option value="2">Mid</option>
          <option value="3">Low</option>
        </select>

        <label htmlFor="">Assignen</label>
        <select
          name="assigned"
          onChange={inputChange}
          value={bugObject.assigned}
        >
          <option>Ramiro Krupoviesa</option>
        </select>
        <label htmlFor="">Application Version:</label>
        <input
          name="version"
          placeholder="Application Version"
          onChange={inputChange}
          value={bugObject.version}
        ></input>
        <button type="submit">{props.title}</button>
      </form>
    </div>
  );
};

export default BugForm;
