import Image from "next/image";
import { Switch } from "@headlessui/react";
import { PencilIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { User, UserRole } from "../../utils/types";
import LoadingSpinner from "../loadingSpinner";
import { useEffect } from "react";
import { useCallback } from "react";

interface Props {
  user: User;
}

const UserCard = (props: Props): JSX.Element => {
  const { user } = props;
  const userRoles = user.roles;
  const roles: ["admin", "pm", "dev"] = ["admin", "pm", "dev"];
  const [edit, setEdit] = useState(false);
  const [activeRoles, setActiveRoles] = useState({
    admin: { active: userRoles.includes("admin"), loading: false },
    pm: { active: userRoles.includes("pm"), loading: false },
    dev: { active: userRoles.includes("dev"), loading: false },
  });

  const [sendingRequest, setSendingRequest] = useState(false);

  const addRoles = async (role: string): Promise<void> => {
    if (!sendingRequest) {
      setActiveRoles((prevState) => {
        return {
          ...prevState,
          [role]: { active: false, loading: true },
        };
      });
      setSendingRequest(true);
      const response = await fetch(`/api/users/${user.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        setActiveRoles((prevState) => {
          return {
            ...prevState,
            [role]: { active: true, loading: false },
          };
        });
      } else {
        setActiveRoles((prevState) => {
          return {
            ...prevState,
            [role]: { active: false, loading: false },
          };
        });
      }
      setSendingRequest(false);
    }
  };

  const removeRoles = async (role: string): Promise<void> => {
    if (!sendingRequest) {
      setActiveRoles((prevState) => {
        return {
          ...prevState,
          [role]: { active: true, loading: true },
        };
      });
      setSendingRequest(true);
      const response = await fetch(`/api/users/${user.user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        setActiveRoles((prevState) => {
          return {
            ...prevState,
            [role]: { active: false, loading: false },
          };
        });
      } else {
        setActiveRoles((prevState) => {
          return {
            ...prevState,
            [role]: { active: true, loading: false },
          };
        });
      }
      setSendingRequest(false);
    }
  };

  return (
    <div className="mb-4 mr-4 flex-grow">
      <div className="shadow-lg rounded-2xl p-4 w-full bg-white">
        <div className="flex justify-between mb-4 items-center">
          {/* title */}
          <div className="flex flex-col items-start justify-between">
            <span className="font-bold text-black ml-2">{user.name}</span>
            <span className="text-basa text-gray-500 ml-2">{user.email}</span>
          </div>
          <div className="flex">
            {!activeRoles.admin.active &&
              !activeRoles.dev.active &&
              !activeRoles.pm.active && (
                <span
                  className={`mr-4 px-2 py-1 flex w-auto items-center text-base rounded-md font-semibold text-red-500 bg-red-100`}
                >
                  No roles assigned
                </span>
              )}
            {/* icon */}
            {edit ? (
              <CheckCircleIcon
                className="h-10 w-10 bg-green-50 rounded-md text-green-500 p-1"
                onClick={() => {
                  setEdit(false);
                }}
              />
            ) : (
              <PencilIcon
                className="h-10 w-10 bg-green-50 rounded-md text-green-500 p-1"
                onClick={() => setEdit(true)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* role */}
          <div className="flex items-center justify-start">
            {edit ? (
              <>
                <div className="flex flex-col">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className={`mb-2 px-2 py-1 flex justify-between items-center text-basea rounded-md font-semibold ${
                        activeRoles[role].active
                          ? "text-green-500"
                          : "text-gray-300"
                      } ${
                        activeRoles[role].active ? "bg-green-50" : "bg-gray-50"
                      } w-64`}
                    >
                      {role === "dev"
                        ? UserRole.dev
                        : role === "pm"
                        ? UserRole.pm
                        : UserRole.admin}
                      <Switch
                        checked={activeRoles[role].active}
                        onChange={(value) => {
                          if (value) {
                            addRoles(role);
                          } else {
                            removeRoles(role);
                          }
                        }}
                        className={`${
                          activeRoles[role].active
                            ? "bg-green-500"
                            : "bg-purple-300"
                        }  flex items-center h-7 w-10 rounded-full`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            activeRoles[role].active
                              ? "translate-x-3"
                              : "translate-x-0"
                          } flex items-center justify-center w-7 h-7 transform ${
                            sendingRequest && !activeRoles[role].loading
                              ? "bg-gray-300"
                              : "bg-white"
                          } rounded-full transition-all border ${
                            activeRoles[role].active
                              ? "border-green-500"
                              : "border-purple-300"
                          }`}
                        >
                          {activeRoles[role].loading ? (
                            <LoadingSpinner className="h-full w-full stroke-current stroke-8" />
                          ) : null}
                        </span>
                      </Switch>
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                {roles.map((role) => (
                  <span
                    key={role}
                    className={`mb-2 px-2 py-1 flex items-center text-basea rounded-md font-semibold ${
                      activeRoles[role].active
                        ? "text-green-500"
                        : "text-gray-300"
                    } ${
                      activeRoles[role].active ? "bg-green-50" : "bg-gray-50"
                    } w-64`}
                  >
                    {role === "dev"
                      ? UserRole.dev
                      : role === "pm"
                      ? UserRole.pm
                      : UserRole.admin}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="ml-4 block h-full w-full rounded-full">
            <Image
              alt="profile"
              src={user.picture}
              width="80"
              height="80"
              className="rounded-full"
            />
          </span>
        </div>

        {/* date tag */}
        <span
          className={`px-2 py-1 flex w-auto mt-4 items-center text-base rounded-md font-semibold text-purple-500 bg-purple-100`}
        >
          JOINED: {new Date(user.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
