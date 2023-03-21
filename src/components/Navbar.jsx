import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="invisible relative flex h-16 flex-col justify-center bg-black text-center md:visible md:rounded-tl-lg">
      <h3 className="flex items-center justify-center font-fontNove text-lg text-sky-400">
        <span className="mr-2">SpeakEasy</span>
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-center" />
      </h3>
    </div>
  );
};

export default Navbar;
