import { useAppSelector } from "../../../utils/store";
import LoadingCard from "../UIElements/loadingCard";
import ProjectCard from "./ProjectCard/projectCard";
import EmptyCard from "../UIElements/emptyCard";

const DashboardProjectsSummary = (): JSX.Element => {
  const { projectsData } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      {projectsData.loading ? (
        <LoadingCard />
      ) : projectsData.projects.length > 0 ? (
        projectsData.projects.map((project) => {
          return <ProjectCard project={project} key={project._id} />;
        })
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default DashboardProjectsSummary;
