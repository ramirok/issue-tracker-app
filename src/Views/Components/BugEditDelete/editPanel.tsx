type Props = { editClicked: () => void; deleteClicked: () => void };
const EditBug = (props: Props): JSX.Element => {
  return (
    <div>
      <button onClick={props.editClicked}>Edit</button>
      <button onClick={props.deleteClicked}>Delete </button>
    </div>
  );
};

export default EditBug;
