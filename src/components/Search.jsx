import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = () => {
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
        />
      </div>
    </div>
  );
};

export default Search;
