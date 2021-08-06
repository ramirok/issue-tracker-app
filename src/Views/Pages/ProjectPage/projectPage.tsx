import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon, XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../../Controllers/Redux/projectSlice";
import { useAppSelector } from "../../../utils/store";
import ProjectCardDetailed from "../../Components/DashboardProjectsSummary/ProjectCard/projectCardDetailed";
import { useAuth0 } from "@auth0/auth0-react";
import EmptyCard from "../../Components/UIElements/emptyCard";
import SearchBar from "./searchBar/searchBar";
import { User } from "../../../utils/types";
import LoadingCard from "../../Components/UIElements/loadingCard";

const ProjectPage = (): JSX.Element => {
  const { projectsData } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const [tagList, setTagList] = useState([] as string[]);
  const [membersList, setMembersList] = useState([] as User[]);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    currentTag: "",
    currentMember: "",
  });

  const addNewProject = async (): Promise<void> => {
    const token = await getAccessTokenSilently();
    await createProject(dispatch, token, {
      projectName: formData.name,
      companyName: formData.companyName,
      tags: tagList,
      members: membersList,
    });

    closeModal();
  };

  const addToTagList = (newTag: string): void => {
    if (!tagList.find((tag) => tag === newTag) && newTag) {
      setTagList((tagList) => [...tagList, newTag]);
      setFormData((prevState) => ({ ...prevState, currentTag: "" }));
    }
  };
  const addToMembersList = (newMember: User): void => {
    if (
      !membersList.find((member) => member.user_id === newMember.user_id) &&
      newMember
    ) {
      setMembersList((prevState) => [...prevState, newMember]);
      setFormData((prevState) => ({ ...prevState, currentMember: "" }));
    }
  };
  const removeFromTagList = (tagToRemove: string): void => {
    setTagList((tagList) => tagList.filter((tag) => tag !== tagToRemove));
  };

  const removeFromMembersList = (memberToRemove: User): void => {
    setMembersList((memberList) =>
      memberList.filter((member) => member.user_id !== memberToRemove.user_id)
    );
  };
  const closeModal = (): void => {
    setIsOpen(false);
    setTagList([]);
    setMembersList([]);
    setFormData({
      name: "",
      companyName: "",
      currentTag: "",
      currentMember: "",
    });
    setShowSuggestions(false);
  };

  const inputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormData((prevState) => ({ ...prevState, ...newState }));
  };
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <>
      <div className="bg-purple-100 p-2 w-full items-center sm:h-20 h-32 rounded-2xl mb-2 flex justify-start">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white h-full rounded-2xl shadow-md mr-4"
        >
          <DocumentAddIcon className="text-green-500 h-full w-20 p-2" />
        </button>
      </div>
      <div className="flex flex-wrap -mr-4">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0  bg-black opacity-40" />

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 font-bold text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="div"
                    className="font-bold text-black text-2xl flex items-center justify-between"
                  >
                    New Project
                    <XCircleIcon
                      className="h-10 text-purple-500 cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-4 text-xl">
                    <label htmlFor="name" className="block mt-2">
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="E.G. Messages App"
                      name="name"
                      onChange={inputChange}
                      value={formData.name}
                      className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                    />
                    <label htmlFor="company" className="block mt-4">
                      Company Name
                    </label>
                    <input
                      id="company"
                      placeholder="E.G. Google Inc."
                      name="companyName"
                      onChange={inputChange}
                      value={formData.companyName}
                      className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                    />

                    <div className="flex flex-col">
                      <label htmlFor="members" className="block mt-4">
                        Project Members
                      </label>

                      <SearchBar
                        placeholder="E.G. Lisa..."
                        onChange={inputChange}
                        showSuggestions={showSuggestions}
                        setShowSuggestions={setShowSuggestions}
                        addToMembersList={addToMembersList}
                        value={formData.currentMember}
                      />
                      <div className="flex flex-wrap">
                        {membersList.map((member) => (
                          <span
                            key={member.user_id}
                            className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                          >
                            {member.name}
                            <button
                              className="font-black ml-2 text-red-500"
                              onClick={() => removeFromMembersList(member)}
                            >
                              X
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="tag" className="block mt-2">
                        Project Tags
                      </label>
                      <form
                        autoComplete="off"
                        onSubmit={(e) => {
                          e.preventDefault();
                          addToTagList(formData.currentTag.toUpperCase());
                        }}
                        className=" border flex items-center border border-gray-300 rounded-lg relative"
                      >
                        <input
                          id="tag"
                          name="currentTag"
                          placeholder="e.g. js, node ..."
                          className="uppercase rounded-lg w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                          type="text"
                          value={formData.currentTag}
                          onChange={inputChange}
                        />
                        <button
                          type="submit"
                          className="border border-purple-500 rounded-lg w-10 leading-8 text-4xl text-purple-500 absolute right-1 hover:bg-purple-500 hover:text-white transition-all"
                        >
                          +
                        </button>
                      </form>
                      <div className="flex flex-wrap">
                        {tagList.map((tag) => (
                          <span
                            key={tag}
                            className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                          >
                            {tag}
                            <button
                              className="font-black ml-2 text-red-500"
                              onClick={() =>
                                removeFromTagList(tag.toUpperCase())
                              }
                            >
                              X
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 font-bold text-white bg-purple-500 border border-transparent rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={addNewProject}
                    >
                      ADD NEW PROJECT
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 font-bold text-purple-500 border border-purple-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        setFormData({
                          name: "",
                          companyName: "",
                          currentTag: "",
                          currentMember: "",
                        });
                        setTagList([]);
                        setMembersList([]);
                      }}
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {projectsData.loading ? (
          <LoadingCard />
        ) : projectsData.projects.length > 0 ? (
          projectsData.projects.map((project) => (
            <ProjectCardDetailed project={project} key={project._id} />
          ))
        ) : (
          <EmptyCard />
        )}
      </div>
    </>
  );
};

export default ProjectPage;
