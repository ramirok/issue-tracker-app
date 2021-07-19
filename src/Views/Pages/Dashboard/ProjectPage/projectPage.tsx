import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon, XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewProject } from "../../../../Controllers/projectController";
import { createProject } from "../../../../Controllers/Redux/projectSlice";
import { useAppSelector } from "../../../../utils/store";
import ProjectCardDetailed from "../../../Components/ProjectComponent/ProjectCard/projectCardDetailed";

const ProjectPage = (): JSX.Element => {
  const { projects } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [tagList, setTagList] = useState([] as string[]);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    currentTag: "",
  });

  const addNewProject = (): void => {
    dispatch(
      createProject(
        createNewProject({
          _id: 1235676,
          ...formData,
          tags: tagList,
          time: Date.now().toString(),
        })
      )
    );

    closeModal();
  };

  const addToTagList = (newTag: string): void => {
    if (!tagList.find((tag) => tag === newTag) && newTag) {
      setTagList((tagList) => [...tagList, newTag]);
      setFormData((prevState) => ({ ...prevState, currentTag: "" }));
    }
  };
  const removeFromTagList = (tagToRemove: string): void => {
    setTagList((tagList) => tagList.filter((tag) => tag !== tagToRemove));
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setTagList([]);
    setFormData({ name: "", companyName: "", currentTag: "" });
  };

  const inputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormData((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <div className="flex flex-wrap -mr-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-2xl p-4 mr-4 mb-4 flex flex-col justify-center items-center font-bold flex-grow"
      >
        Add New
        <DocumentAddIcon className="h-20 text-green-500" />
      </button>

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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="div"
                  className="font-bold text-black text-2xl flex items-center justify-between"
                >
                  New Project
                  <XCircleIcon
                    className="h-10 text-yellow-500 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="mt-4 text-xl">
                  <label htmlFor="project-name" className="block mt-2">
                    Name
                  </label>
                  <input
                    placeholder="Enter Your Project Name"
                    name="name"
                    onChange={inputChange}
                    value={formData.name}
                    className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-transparent"
                  />
                  <label htmlFor="project-name" className="block mt-4">
                    Company Name
                  </label>
                  <input
                    placeholder="Enter The Project Owner"
                    name="companyName"
                    onChange={inputChange}
                    value={formData.companyName}
                    className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-transparent"
                  />

                  <div className="flex flex-col">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addToTagList(formData.currentTag.toUpperCase());
                      }}
                      className="mt-8 border flex items-center border border-gray-300 rounded-lg relative"
                    >
                      <input
                        name="currentTag"
                        placeholder="Enter Tags"
                        className="rounded-lg w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-transparent"
                        type="text"
                        value={formData.currentTag}
                        onChange={inputChange}
                      />
                      <button
                        type="submit"
                        className="border border-yellow-500 rounded-lg w-10 leading-8 text-4xl text-yellow-500 absolute right-1 hover:bg-yellow-500 hover:text-white transition-all"
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
                            onClick={() => removeFromTagList(tag.toUpperCase())}
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
                    className="inline-flex justify-center px-4 py-2 font-bold text-white bg-yellow-500 border border-transparent rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={addNewProject}
                  >
                    ADD NEW PROJECT
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 font-bold text-yellow-500 border border-yellow-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      setFormData({
                        name: "",
                        companyName: "",
                        currentTag: "",
                      });
                      setTagList([]);
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

      {projects.map((project) => (
        <ProjectCardDetailed project={project} key={project._id} />
      ))}
    </div>
  );
};

export default ProjectPage;
