import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import {
  NewspaperIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeProject,
  deleteProject,
  editProject,
} from "../../../../Controllers/Redux/projectSlice";
import { useAppSelector } from "../../../../utils/store";
import { Project, User } from "../../../../utils/types";
import SearchBar from "../../../Pages/ProjectPage/searchBar/searchBar";

interface Props {
  project: Project;
}

const ProjectCardDetailed = (props: Props): JSX.Element => {
  const { project } = props;
  const dispatch = useDispatch();
  const { userData } = useAppSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: project.projectName,
    companyName: project.companyName,
    currentTag: "",
    currentMember: "",
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [membersList, setMembersList] = useState(project.members);
  const [tagList, setTagList] = useState(project.tags);

  const markComplete = async (): Promise<void> => {
    await completeProject(dispatch, userData.token, {
      completed: !project.completed,
      _id: project._id,
    });
  };
  const clickEdit = (): void => {
    setIsOpen(true);
  };
  const clickDelete = async (): Promise<void> => {
    await deleteProject(dispatch, userData.token, { _id: project._id });
  };
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const inputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormData((prevState) => ({ ...prevState, ...newState }));
  };
  const removeFromMembersList = (memberToRemove: User): void => {
    setMembersList((memberList) =>
      memberList.filter((member) => member.user_id !== memberToRemove.user_id)
    );
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
  const addToTagList = (newTag: string): void => {
    if (!tagList.find((tag) => tag === newTag) && newTag) {
      setTagList((tagList) => [...tagList, newTag]);
      setFormData((prevState) => ({ ...prevState, currentTag: "" }));
    }
  };
  const removeFromTagList = (tagToRemove: string): void => {
    setTagList((tagList) => tagList.filter((tag) => tag !== tagToRemove));
  };

  const updateProject = async (): Promise<void> => {
    await editProject(dispatch, userData.token, {
      _id: project._id,
      members: membersList,
      companyName: formData.companyName,
      projectName: formData.name,
      tags: tagList,
    });
    closeModal();
  };
  return (
    <div className="mb-4 flex-grow mr-4">
      <div
        className={`shadow-lg rounded-2xl p-4 bg-${
          project.completed ? "gray-300" : "white"
        }  w-full`}
      >
        <div className="flex items-center justify-between mb-6">
          {/* title */}
          <div className="flex items-center">
            {/* icon */}
            <span className="rounded-xl relative p-2 bg-blue-100">
              <NewspaperIcon className="h-10 w-10" />
            </span>

            <div className="flex flex-col">
              <span className="font-bold text-black ml-2">
                {project.projectName}
              </span>
              <span className="text-base text-gray-500  ml-2">
                {project.companyName}
              </span>
            </div>
          </div>

          {/* dots menu */}
          <Menu as="div" className="flex justify-center relative ml-4">
            <Menu.Button>
              <DotsVerticalIcon className="h-12 w-12 border rounded-full bg-gray-200 p-1" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 text-lg absolute right-0 top-full w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-purple-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={markComplete}
                      >
                        {project.completed
                          ? "MARK AS INCOMPLETE"
                          : "MARK AS COMPLETE"}
                        <ExclamationCircleIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-purple-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={clickEdit}
                      >
                        EDIT
                        <PencilIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-purple-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={clickDelete}
                      >
                        DELETE
                        <XCircleIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* technologies tags */}
        <div className="flex items-center justify-start my-4 space-x-4">
          {project.tags.map((tag) => {
            return (
              <span
                key={tag}
                className="px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* people in this project */}
        <div className="flex -space-x-4">
          {project.members.map((member) => (
            <Popover className="relative" key={member.user_id}>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <img
                      src={member.picture}
                      alt="profile"
                      className={`h-14 w-14 rounded-full ${
                        project.completed ? "" : "ring-2 ring-white"
                      }`}
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 px-4 mt-3 transform sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-col bg-white p-1">
                          <span className="p-2 flex justify-between border-b-2 ">
                            {member.name}
                          </span>
                          <span className="p-2 flex justify-between hover:bg-purple-100">
                            <p>{member.email}</p>
                            <DocumentDuplicateIcon
                              className="active:bg-green-100 active:text-green-500 h-8 ml-4 rounded-lg cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(member.email);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ))}
        </div>

        {/* date tag */}
        <span
          className={`px-2 py-1 flex w-auto mt-4 items-center text-base rounded-md font-semibold text-${
            project.completed ? "green" : "purple"
          }-500 bg-${project.completed ? "green" : "purple"}-100`}
        >
          {project.completed ? "COMPLETED - " : null}
          CREATED: {new Date(project.createdAt).toLocaleString()}
        </span>
      </div>

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
                  Edit Project
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
                    className="inline-flex justify-center px-4 py-2 font-bold text-white bg-purple-500 border border-transparent rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={updateProject}
                  >
                    UPDATE PROJECT
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
    </div>
  );
};

export default ProjectCardDetailed;
