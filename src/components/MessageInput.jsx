import { PaperClipIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const MessageInput = () => {
  return (
    <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
      <button>
        <PaperClipIcon className="h-5 w-5 -rotate-12 text-gray-500" />
      </button>

      <input
        type="text"
        placeholder="Message"
        className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
        name="message"
        required
      />
      <button type="submit">
        <PaperAirplaneIcon className="h-5 w-5 -rotate-12 text-gray-500" />
      </button>
    </div>
  );
};

export default MessageInput;
