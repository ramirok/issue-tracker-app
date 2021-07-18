import { Bug } from "../../../utils/types";
import setPriority from "../../../Controllers/priorityController";

type Props = {
  bug: Bug;
  clicked: (name: string) => void;
};

const BugCard = (props: Props): JSX.Element => {
  const { name, priority, version } = props.bug;
  const { level, color } = setPriority(priority);

  const clickHandler = (): void => {
    props.clicked(name);
  };
  return (
    <div onClick={clickHandler} style={{ backgroundColor: color }}>
      <h2>{name}</h2>
      <h4>{level}</h4>
      <h5>{version}</h5>
    </div>
  );
};

export default BugCard;
