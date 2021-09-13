import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";
import {
  createProject,
  editProject,
  projectCreated,
  projectsLoading,
  projectUpdated,
} from "../../../../Controllers/Redux/projectSlice";
import { useForm } from "../../../../utils/formValidation";
import { useAppSelector } from "../../../../utils/store";
import { Project, User } from "../../../../utils/types";
import LoadingSpinner from "../../LoadingSpinner/loadingSpinner";
import UsersSearchBar from "../UsersSearchBar/usersSearchBar";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  project?: Project;
}

interface FormData {
  projectName: string;
  companyName: string;
  currentMember: string;
  currentTag: string;
}

const ProjectForm = (props: Props): JSX.Element => {
  const { isOpen, closeModal, project } = props;
  const dispatch = useDispatch();
  const { userData } = useAppSelector((state) => state);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tagList, setTagList] = useState(project ? project.tags : []);
  const [membersList, setMembersList] = useState(
    project ? project.members : []
  );
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
  });

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
      setData((prevState) => ({ ...prevState, currentMember: "" }));
    }
  };
  const addToTagList = (newTag: string): void => {
    if (!tagList.find((tag) => tag === newTag) && newTag) {
      setTagList((tagList) => [...tagList, newTag]);
      setData((prevState) => ({ ...prevState, currentTag: "" }));
    }
  };
  const removeFromTagList = (tagToRemove: string): void => {
    setTagList((tagList) => tagList.filter((tag) => tag !== tagToRemove));
  };
  const submitForm = async (): Promise<void> => {
    if (membersList.length > 0 && tagList.length > 0) {
      setFormStatus({ loading: true, error: false });
      if (project) {
        const [error, response] = await editProject(userData.token, {
          _id: project._id,
          members: membersList,
          companyName: data.companyName,
          projectName: data.projectName,
          tags: tagList,
        });
        if (error) {
          setFormStatus({ loading: false, error: true });
        } else {
          dispatch(projectsLoading());
          dispatch(projectUpdated(response));
          closeModal();
        }
      } else {
        const [error, response] = await createProject(userData.token, {
          projectName: data.projectName,
          companyName: data.companyName,
          tags: tagList,
          members: membersList,
        });
        if (error) {
          setFormStatus({ loading: false, error: true });
        } else {
          dispatch(projectsLoading());
          dispatch(projectCreated(response));
          closeModal();
        }
      }
    }
  };

  const { handleSubmit, handleChange, data, setData, errors } =
    useForm<FormData>({
      onSubmit: submitForm,
      initialValues: project
        ? {
            projectName: project.projectName,
            companyName: project.companyName,
            currentTag: "",
            currentMember: "",
          }
        : {
            projectName: "",
            companyName: "",
            currentTag: "",
            currentMember: "",
          },
      validations: {
        companyName: {
          custom: {
            isValid: (value) => value.length > 3,
            message: "Company Name must have a least 4 characters.",
          },
        },
        projectName: {
          custom: {
            isValid: (value) => value.length > 3,
            message: "Project Name must have a least 4 characters.",
          },
        },
      },
    });

  return (
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
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="inline-block w-full max-w-md p-6 my-8 font-bold text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="div"
                className="font-bold text-black text-2xl flex items-center justify-between"
              >
                {project ? "Edit Project" : "New Project"}
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
                  onChange={handleChange("projectName")}
                  value={data.projectName}
                  className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                />
                {errors.projectName && (
                  <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                    {errors.projectName}
                  </p>
                )}

                <label htmlFor="company" className="block mt-4">
                  Company Name
                </label>
                <input
                  id="company"
                  placeholder="E.G. Google Inc."
                  name="companyName"
                  onChange={handleChange("companyName")}
                  value={data.companyName}
                  className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                />
                {errors.companyName && (
                  <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                    {errors.companyName}
                  </p>
                )}

                <div className="flex flex-col">
                  <label htmlFor="members" className="block mt-4">
                    Project Members
                  </label>
                  <UsersSearchBar
                    placeholder="E.G. Lisa..."
                    onChange={handleChange("currentMember")}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    addToMembersList={addToMembersList}
                    value={data.currentMember}
                  />
                  {membersList.length < 1 && (
                    <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                      You need at least 1 member.
                    </p>
                  )}
                  <div className="flex flex-wrap">
                    {membersList.map((member) => (
                      <span
                        key={member.user_id}
                        className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                      >
                        {member.name}
                        <button
                          type="button"
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
                  <div className=" border flex items-center  border-gray-300 rounded-lg relative">
                    <input
                      id="tag"
                      name="currentTag"
                      placeholder="e.g. js, node ..."
                      className="uppercase rounded-lg w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                      type="text"
                      value={data.currentTag}
                      onChange={handleChange("currentTag")}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addToTagList(data.currentTag.toUpperCase());
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="border border-purple-500 rounded-lg w-10 leading-8 text-4xl text-purple-500 absolute right-1 hover:bg-purple-500 hover:text-white transition-all"
                      onClick={() => {
                        addToTagList(data.currentTag.toUpperCase());
                      }}
                    >
                      +
                    </button>
                  </div>

                  {tagList.length < 1 && (
                    <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                      You need at least 1 tag.
                    </p>
                  )}
                  <div className="flex flex-wrap">
                    {tagList.map((tag) => (
                      <span
                        key={tag}
                        className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                      >
                        {tag}
                        <button
                          type="button"
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

              <div className="mt-8 mb-4 flex justify-between">
                {formStatus.loading ? (
                  <LoadingSpinner className="h-11 w-3/5 bg-purple-500 rounded-lg stroke-current stroke-3 text-white" />
                ) : (
                  <button
                    type="submit"
                    className={`w-3/5 inline-flex justify-center px-4 py-2 font-bold text-white bg-purple-500 border rounded-lg`}
                  >
                    {project ? " UPDATE PROJECT" : "CREATE PROJECT"}
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 font-bold text-purple-500 border border-purple-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    setData({
                      companyName: "",
                      projectName: "",
                      currentMember: "",
                      currentTag: "",
                    });
                    setTagList([]);
                    setShowSuggestions(false);
                    setMembersList([]);
                  }}
                >
                  RESET
                </button>
              </div>
              {formStatus.error && (
                <p className="text-red-500 text-lg absolute bottom-2 transform translate-x-1/2">
                  Failed, please try again
                </p>
              )}
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectForm;
