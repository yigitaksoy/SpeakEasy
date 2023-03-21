import Conversation from "../components/Conversation";
import MessageInput from "../components/MessageInput";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Chat = () => {
  return (
    <div className="bg-black">
      <div className="flex items-center justify-center md:h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="flex min-w-full flex-col font-fontInforma">
            <div className="flex-1 rounded-lg border border-gray-200 bg-white lg:grid lg:grid-cols-3">
              <div className="bg-slate-50 lg:col-span-1">
                <Navbar />
                <Sidebar />
              </div>
              <div className="lg:col-span-2 lg:block">
                <div className="w-full">
                  <Conversation />
                  <MessageInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
