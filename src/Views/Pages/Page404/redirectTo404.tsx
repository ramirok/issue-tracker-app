import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const RedirectTo404 = (): null => {
  const history = useHistory();
  useEffect(() => {
    history.push("/404");
  }, [history]);
  return null;
};

export default RedirectTo404;
