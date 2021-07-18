import setPriority from "../../../Controllers/priorityController";

type Props = {
  count: number;
  priority: number;
  clicked: () => void;
};

const Card = (props: Props): JSX.Element => {
  const { level, color } = setPriority(props.priority);

  return (
    <div style={{ color }} onClick={props.clicked}>
      <h2>Total: {level}</h2>
      <p>{props.count}</p>
    </div>
  );
};

export default Card;
