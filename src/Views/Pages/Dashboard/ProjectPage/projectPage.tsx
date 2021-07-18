import { DocumentAddIcon } from "@heroicons/react/solid";
import { useAppSelector } from "../../../../utils/store";
import ProjectCardDetailed from "../../../Components/ProjectComponent/ProjectCard/projectCardDetailed";

const ProjectPage = (): JSX.Element => {
  const { projects } = useAppSelector((state) => state);
  return (
    <div className="flex flex-wrap -mr-4">
      <button className="bg-white rounded-2xl p-4 mr-4 mb-4 flex flex-col justify-center items-center font-bold flex-grow">
        Add New
        <DocumentAddIcon className="h-20 text-green-500" />
      </button>
      {projects.map((project) => (
        <ProjectCardDetailed project={project} key={project._id} />
      ))}
    </div>
  );
};

export default ProjectPage;
