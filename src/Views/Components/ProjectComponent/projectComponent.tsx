import { useAppSelector } from "../../../utils/store";
import ProjectCard from "./ProjectCard/projectCard";

const ProjectComponent = (): JSX.Element => {
  const { projects } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      {projects.map((project) => {
        return <ProjectCard project={project} key={project._id} />;
      })}
    </div>
  );
};

export default ProjectComponent;
