type Props = { title: string; info: any };

const BugViewSection = (props: Props): JSX.Element => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.info}</p>
    </div>
  );
};

export default BugViewSection;
