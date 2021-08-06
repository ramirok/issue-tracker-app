import { useAuth0 } from "@auth0/auth0-react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { User } from "../../../../utils/types";

interface Props {
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  addToMembersList: (newMember: User) => void;
  value: string;
}
const SearchBar = (props: Props): JSX.Element => {
  const [fetchedMembers, setFetchedMembers] = useState([] as User[]);
  const [suggestions, setSuggestions] = useState([] as User[]);
  const [selected, setSelected] = useState("");

  const filterDataFetched = (e: React.FormEvent<HTMLInputElement>): void => {
    const newSuggestions = fetchedMembers.filter(
      (member) =>
        member.name
          .toLowerCase()
          .includes(e.currentTarget.value.toLowerCase()) ||
        member.app_metadata.roles.includes(e.currentTarget.value.toLowerCase())
    );

    setSuggestions(newSuggestions);
    if (e.currentTarget.value) {
      setSelected(newSuggestions[0]?.name || "");
    } else {
      setSelected("");
    }
  };

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      fetch("http://localhost:3001/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setFetchedMembers(data.users);
          setSuggestions(data.users);
        });
    });
  }, [getAccessTokenSilently]);

  return (
    <form
      autoComplete="off"
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
      />
      <button
        type="button"
        className={`flex justify-center rounded-lg w-10 absolute right-1.5  hover:bg-purple-500 hover:text-white transition-all ${
          props.showSuggestions
            ? "text-white bg-purple-500 border border-purple-500"
            : "text-purple-500 border border-purple-500"
        } `}
        onClick={() => props.setShowSuggestions((prevState) => !prevState)}
      >
        <ChevronDownIcon className="h-8" />
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
          <div className="z-10 flex flex-col absolute top-full w-full mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-40 border border-purple-300 text-xl">
            {suggestions.length > 0 ? (
              suggestions.map((member) => (
                <button
                  type="submit"
                  key={member.user_id}
                  className={`${
                    member.name === selected
                      ? "bg-purple-500 text-white"
                      : "hover:bg-purple-100 hover:text-gray-900"
                  } m-1 rounded-lg  py-1 px-2 flex justify-between items-center`}
                  onClick={() => {
                    props.addToMembersList(member);
                    setSuggestions(fetchedMembers);
                    props.setShowSuggestions(false);
                  }}
                >
                  <img
                    src={member.picture}
                    alt="profile"
                    className="h-8 rounded-full"
                  />
                  <span>{member.name}</span>
                  {member.app_metadata.roles.map((role) => (
                    <span key={member.user_id}>{role.toUpperCase()}</span>
                  ))}
                </button>
              ))
            ) : (
              <span className="m-1 rounded-lg py-2 px-2 text-left">
                No Results
              </span>
            )}
          </div>
        </Transition>
      )}
    </form>
  );
};

export default SearchBar;
