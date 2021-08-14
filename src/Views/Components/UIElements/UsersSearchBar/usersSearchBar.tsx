import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../../../utils/store";
import { User } from "../../../../utils/types";

interface Props {
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  addToMembersList: (newMember: User) => void;
  value: string;
}
const UsersSearchBar = (props: Props): JSX.Element => {
  const [fetchedMembers, setFetchedMembers] = useState([] as User[]);
  const [suggestions, setSuggestions] = useState([] as User[]);
  const [selected, setSelected] = useState("");
  const { userData } = useAppSelector((state) => state);

  const filterDataFetched = (e: React.FormEvent<HTMLInputElement>): void => {
    const newSuggestions = fetchedMembers.filter(
      (member) =>
        member.name
          .toLowerCase()
          .includes(e.currentTarget.value.toLowerCase()) ||
        member.roles.join(" ").includes(e.currentTarget.value.toLowerCase())
    );

    setSuggestions(newSuggestions);
    if (e.currentTarget.value) {
      setSelected(newSuggestions[0]?.user_id || "");
    } else {
      setSelected("");
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    fetch("http://localhost:3001/users", {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((response) => response.json())
      .then((users) => {
        if (isSubscribed) {
          setFetchedMembers(users.data);
          setSuggestions(users.data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [userData.token]);

  return (
    <div
      className="relative flex items-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        id="members"
        name="currentMember"
        placeholder={props.placeholder}
        className="rounded-lg border border-gray-300 w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
        type="text"
        value={props.value}
        onChange={(e) => {
          props.onChange(e);
          props.setShowSuggestions(true);
          filterDataFetched(e);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            const userFound = suggestions.find(
              (user) => user.user_id === selected
            )!;
            if (userFound) {
              props.addToMembersList(userFound);
              setSuggestions(fetchedMembers);
              props.setShowSuggestions(false);
            }
          }
        }}
      />
      <button
        type="button"
        className={`flex justify-center rounded-lg w-10 absolute right-1.5  hover:bg-purple-500 hover:text-white transition-all ${
          props.showSuggestions
            ? "text-white bg-purple-500 border border-purple-500"
            : "text-purple-500 border border-purple-500"
        } `}
        onClick={() => {
          props.setShowSuggestions((prevState) => !prevState);
        }}
      >
        <ChevronDownIcon
          className={`h-8 ${
            props.showSuggestions ? "transform rotate-180" : ""
          } transition-all`}
        />
      </button>
      {props.showSuggestions && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <ul className="z-10 flex flex-col absolute top-full w-full mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 border border-purple-300 text-xl">
            {suggestions.length > 0 ? (
              suggestions.map((member) => (
                <li
                  key={member.user_id}
                  className={`${
                    member.user_id === selected
                      ? "bg-purple-500 text-white"
                      : "hover:bg-purple-100 hover:text-gray-900"
                  } m-1 rounded-lg  py-1 px-2 flex justify-between items-center cursor-pointer font-normal`}
                  onClick={() => {
                    props.addToMembersList(member);
                    setSuggestions(fetchedMembers);
                    props.setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={member.picture}
                      alt="profile"
                      className="h-8 rounded-full mr-2"
                    />
                    <span>{member.name}</span>
                  </div>
                  <div>
                    {member.roles.map((role) => (
                      <span key={member.user_id} className="ml-2">
                        {role.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </li>
              ))
            ) : (
              <li className="m-1 rounded-lg py-2 px-2 text-left">No Results</li>
            )}
          </ul>
        </Transition>
      )}
    </div>
  );
};

export default UsersSearchBar;
