import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../utils/store";
import { getBugs } from "../../Controllers/Redux/bugSlice";
import BugCard from "../Components/BugCard/bugCard";
import BugView from "../Components/BugView/bugView";

const ViewBug = (): JSX.Element => {
  const [displayBug, setDisplayBug] = useState({
    name: "",
    isDisplayed: false,
  });
  const dispatch = useDispatch();
  const { bugs } = useAppSelector((state) => state);

  const bugClicked = (name: string): void => {
    setDisplayBug({ name: name, isDisplayed: !displayBug.isDisplayed });
  };

  useEffect(() => {
    dispatch(getBugs());
  }, [dispatch]);

  return (
    <div>
      {bugs.map((bug) => {
        return <BugCard clicked={bugClicked} key={bug.name} bug={bug} />;
      })}
      {displayBug.isDisplayed && (
        <BugView
          clicked={bugClicked}
          bug={bugs.filter((bug) => bug.name === displayBug.name)[0]!}
        />
      )}
    </div>
  );
};

export default ViewBug;
