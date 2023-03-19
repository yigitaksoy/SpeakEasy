import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <ul className="overflow-auto sm:invisible md:visible">
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
      <li>
        <Link className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
            alt="username"
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="ml-2 block font-semibold text-gray-600">
                Emma
              </span>
              <span className="ml-2 block text-sm text-gray-600">6 hour</span>
            </div>
            <span className="ml-2 block text-sm text-gray-600">
              Good Morning
            </span>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Messages;
