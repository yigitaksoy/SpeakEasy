import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Conversation = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsubscribe();
  }, [data.chatId]);
  return (
    <div>
      <div className="relative flex items-center border-b bg-sky-400 p-3 md:rounded-tr-lg">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={data.user?.photoURL}
          alt="username"
        />
        <span className="ml-2 block font-bold text-black">
          {data.user?.displayName}
        </span>
        <p className="absolute right-12 z-50 font-fontNove"> SpeakEasy </p>
        <button onClick={() => signOut(auth)} className="absolute right-2">
          <ArrowRightOnRectangleIcon className=" h-6 w-6 text-black" />
        </button>
      </div>
      <div className="relative h-[40rem] w-full overflow-y-auto p-6 md:h-[35rem]">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.uid;
          const bubbleClass = isCurrentUser ? "bg-violet-100" : "bg-gray-200";
          return (
            <div
              key={message.id}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      isCurrentUser ? currentUser.photoURL : data.user.photoURL
                    }
                    alt={`${
                      isCurrentUser
                        ? currentUser.displayName
                        : data.user.displayName
                    } profile`}
                  />
                </div>
              </div>
              <div className="chat-header">
                {isCurrentUser
                  ? currentUser.displayName
                  : data.user.displayName}

                <time className="ml-2 text-xs opacity-50">{/* Time */}</time>
              </div>
              <div className={`chat-bubble text-black ${bubbleClass}`}>
                {message.text}
              </div>
              <div className="chat-footer text-xs opacity-50">
                <time className="text-xs opacity-50">
                  {new Date(message.date.seconds * 1000).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Conversation;
