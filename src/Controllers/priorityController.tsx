const colors = ["red", "orange", "green"];

const setPriority = (priority: number) => {
  const level = ["High", "Medium", "Low"];
  return { level: level[priority - 1], color: colors[priority - 1] };
};

export default setPriority;
