import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../utils/store";
import { User, UserRole } from "../../../utils/types";
import EmptyCard from "../../Components/UIElements/EmptyCard/emptyCard";
import LoadingCard from "../../Components/UIElements/LoadingCard/loadingCard";
import UserCard from "../../Components/UIElements/UserCard/userCard";

const RoleManagementPage = (): JSX.Element => {
  const { userData } = useAppSelector((state) => state);
  const roles = ["all", "admin", "pm", "dev"];
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([] as User[]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("");

  const fetchUsersToShow = useCallback(
    async (role: string): Promise<void> => {
      setLoading(true);
      setRoleFilter(role);
      const response = await fetch(`http://localhost:3001/users?role=${role}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      const parsedResponse = await response.json();
      const sortedUsers = parsedResponse.data.sort((a: User, b: User) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
      setUsers(sortedUsers);
      setLoading(false);
    },
    [userData.token]
  );

  useEffect(() => {
    if (userData.token) {
      fetchUsersToShow("all");
    }
  }, [fetchUsersToShow, userData.token]);

  return (
    <>
      <div className="bg-purple-100 p-2 w-full items-center sm:h-20 h-32 rounded-2xl mb-2 flex justify-start">
        <Listbox value={roleFilter} onChange={fetchUsersToShow}>
          <div className="h-full mr-4 flex-grow max-w-xs bg-white rounded-2xl shadow-md">
            <Listbox.Button className="text-left h-full w-full py-2 px-4 flex items-center justify-between">
              {/* {roleFilter} */}
              {roleFilter === "dev"
                ? UserRole.dev
                : roleFilter === "pm"
                ? UserRole.pm
                : roleFilter === "all"
                ? "All"
                : UserRole.admin}
              <div>
                <SelectorIcon className="h-8" />
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="z-10 absolute w-full max-w-xs py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {roles.map((role) => (
                  <Listbox.Option
                    key={role}
                    value={role}
                    className={({ active }) =>
                      `${active ? "bg-purple-100" : ""}
                  cursor-default select-none relative py-2 px-4 flex justify-between items-center`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={"block truncate font-normal"}>
                          {role === "dev"
                            ? UserRole.dev
                            : role === "pm"
                            ? UserRole.pm
                            : role === "all"
                            ? "All"
                            : UserRole.admin}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              selected
                                ? "bg-purple-500 rounded-full text-white"
                                : ""
                            }
                          flex items-center`}
                          >
                            <CheckIcon className="h-6" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <div className="flex items-center h-full relative">
          <input
            className="h-full px-4 mr-4 flex-grow max-w-xs bg-white rounded-2xl shadow-md focus:outline-none"
            placeholder="Search by name..."
            value={userFilter}
            onChange={(e) => setUserFilter(e.currentTarget.value)}
          />
          <SearchIcon className="h-8 w-8 absolute right-8" />
        </div>
      </div>
      {loading ? (
        <div className="flex w-full justify-center">
          <span className="mt-10">
            <LoadingCard />
          </span>
        </div>
      ) : users.length > 0 ? (
        <div className="flex flex-wrap -mr-4 pb-20">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(userFilter.toLowerCase())
            )
            .map((user) => (
              <UserCard user={user} key={user.user_id} />
            ))}
        </div>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default RoleManagementPage;
