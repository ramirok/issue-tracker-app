import { DocumentAddIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useAppSelector } from "../../redux/store";
import ProjectCard from "../../components/UIElements/projectCard";
import EmptyCard from "../../components/UIElements/emptyCard";
import LoadingCard from "../../components/UIElements/loadingCard";
import ProjectForm from "../../components/UIElements/projectForm";

const ProjectPage = (): JSX.Element => {
  const { projectsData, userData } = useAppSelector((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-purple-100 p-2 w-full items-center sm:h-20 h-32 rounded-2xl mb-2 flex justify-start mr-4a">
        {userData.userData.roles.includes("admin") && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white h-full rounded-2xl shadow-md mr-4"
          >
            <DocumentAddIcon className="text-green-500 h-full w-20 p-2" />
          </button>
        )}

        {isOpen && <ProjectForm isOpen={isOpen} closeModal={closeModal} />}
      </div>

      {projectsData.loading ? (
        <div className="flex w-full justify-center">
          <span className="mt-10">
            <LoadingCard />
          </span>
        </div>
      ) : projectsData.projects.length > 0 ? (
        <div className="flex flex-wrap">
          {projectsData.projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default ProjectPage;
