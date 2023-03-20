import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="mx-3 my-3">
      <div className="relative rounded-lg text-gray-600">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </span>
        <input
          type="search"
          className="block w-full rounded bg-gray-100 py-2 pl-10 outline-none"
          name="search"
          placeholder="Search"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className="mt-5 flex-1 border-b-2 border-orange-500">
          <ul className="overflow-auto">
            <h2 className="text-md my-2 mb-2 ml-2 font-fontNove text-black">
              Users
            </h2>
            <li>
              <Link className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.photoURL}
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="ml-2 block font-semibold text-gray-600">
                      {user.displayName}
                    </span>
                    <span className="ml-2 block text-sm text-gray-600">
                      6 hour
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
