import Card from "../../Components/Dashboard/Card";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../utils/store";
import { getBugs } from "../../../Controllers/Redux/bugSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DashboardPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { bugs } = useAppSelector((state) => state);

  let highCount = 0;
  let midCount = 0;
  let lowCount = 0;
  const browserHistory = useHistory();

  const filterBugs = (priority: number) => {
    return bugs.filter((bug) => {
      return bug.priority === priority;
    });
  };
  if (bugs) {
    highCount = filterBugs(1).length;
    midCount = filterBugs(2).length;
    lowCount = filterBugs(3).length;
  }

  const redirect = () => {
    browserHistory.push("/viewbugs");
  };

  useEffect(() => {
    dispatch(getBugs());
    console.log("bugz");
  }, [dispatch]);
  return (
    <div>
      <Card priority={1} count={highCount} clicked={redirect} />
      <Card priority={2} count={midCount} clicked={redirect} />
      <Card priority={3} count={lowCount} clicked={redirect} />
    </div>
  );
};

export default DashboardPage;
