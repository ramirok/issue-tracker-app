import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../Controllers/Redux/authSlice";
import { useAppSelector } from "../../utils/store";

const Sidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { auth } = useAppSelector((state) => state);

  const signOutHandler = (): void => {
    dispatch(signOut());
  };

  return (
    <div>
      <Link to="/">
        <h1>Issue Tracker</h1>
      </Link>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/viewbugs">View Bugs</Link>
        </li>
        {auth.admin && (
          <li>
            <Link to="/create">Create Bug</Link>
          </li>
        )}
      </ul>
      <button onClick={signOutHandler}>Logout</button>
    </div>
  );
};

export default Sidebar;
