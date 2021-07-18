import { Bug } from "../../../utils/types";
import BugViewSection from "./Component/bugViewSection";
import BugModel from "../../../Models/bugModel";
import { useDispatch } from "react-redux";
import { markComplete } from "../../../Controllers/Redux/bugSlice";
import EditBug from "../BugEditDelete/editPanel";
import { useState } from "react";
import BugForm from "../BugCreateAndEdit/bugForm";

type Props = { bug: Bug; clicked: (name: string) => void };

const BugView = (props: Props): JSX.Element => {
  const [displayEdit, setDisplayEdit] = useState(false);
  const dispatch = useDispatch();
  const bug = BugModel(props.bug);

  const editClicked = () => {
    setDisplayEdit(!displayEdit);
  };
  const deleteClicked = () => {};

  return (
    <>
      <div>
        <EditBug editClicked={editClicked} deleteClicked={deleteClicked} />
        <button onClick={() => props.clicked(bug!.name)}>Close</button>
        <h1>{bug!.name}</h1>
        <BugViewSection title="Details" info={bug!.details} />
        <BugViewSection title="Steps" info={bug!.steps} />
        <BugViewSection title="Priority" info={bug!.priority} />
        <BugViewSection title="Creator" info={bug!.version} />
        <BugViewSection title="Time Created" info={bug!.time} />
        <button onClick={() => dispatch(markComplete(bug!))}>
          Mark complete
        </button>
      </div>
      {displayEdit && <BugForm title="Edit" bug={bug} close={editClicked} />}
    </>
  );
};

export default BugView;
