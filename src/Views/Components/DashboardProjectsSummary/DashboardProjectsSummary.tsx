import { useAppSelector } from "../../../utils/store";
import ProjectCard from "../UIElements/ProjectCard/projectCard";
import EmptyCard from "../UIElements/EmptyCard/emptyCard";
import LoadingCard from "../UIElements/LoadingCard/loadingCard";

const DashboardProjectsSummary = (): JSX.Element => {
  const { projectsData } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      <p className="bg-white w-max p-2 px-4 pb-4 rounded-2xl rounded-b-none -mb-4 font-bold">
        Latest Projects
      </p>
      {projectsData.loading ? (
        <div className="mr-4 mb-4">
          <LoadingCard />
        </div>
      ) : projectsData.projects.length > 0 ? (
        [...projectsData.projects]
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((project) => {
            return <ProjectCard project={project} key={project._id} />;
          })
          .slice(0, 4)
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default DashboardProjectsSummary;
