import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Conversation = () => {
  return (
    <div>
      <div className="relative flex items-center border-b bg-sky-400 p-3 md:rounded-tr-lg">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          alt="username"
        />
        <span className="ml-2 block font-bold text-black">Emma</span>
        <p className="absolute right-12 z-50 font-fontNove"> SpeakEasy </p>
        <button onClick={() => signOut(auth)} className="absolute right-2">
          <ArrowRightOnRectangleIcon className=" h-6 w-6 text-black" />
        </button>
      </div>
      <div className="relative h-[40rem] w-full overflow-y-auto p-6 md:h-[35rem]">
        <ul className="space-y-2">
          <li className="flex justify-start">
            <div className="relative max-w-xl rounded px-4 py-2 text-gray-700 shadow">
              <span className="block">Received Message</span>
            </div>
          </li>
          <li className="flex justify-end">
            <div className="relative max-w-xl rounded bg-gray-100 px-4 py-2 text-gray-700 shadow">
              <span className="block">Sent Message</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Conversation;
