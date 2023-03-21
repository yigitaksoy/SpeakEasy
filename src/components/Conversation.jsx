import { useContext, useState, useEffect, useRef } from "react";
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

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsubscribe();
  }, [data.chatId]);
  return (
    <div>
      <div className="relative flex items-center border-b bg-black p-3 md:rounded-tr-lg">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={data.user?.photoURL}
          alt="username"
        />
        <span className="ml-2 block font-bold text-white">
          {data.user?.displayName}
        </span>
        <p className="absolute right-12 z-50 font-fontNove text-white md:hidden">
          SpeakEasy
        </p>
        <button onClick={() => signOut(auth)} className="absolute right-5">
          <ArrowRightOnRectangleIcon className=" h-6 w-6 text-sky-400" />
        </button>
      </div>
      <div
        className="relative h-[40rem] w-full overflow-y-auto p-6 md:h-[35rem]
      "
      >
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.uid;
          const bubbleClass = isCurrentUser
            ? "chat-bubble-info shadow-md text-white"
            : "bg-gray-200 text-black shadow-md";
          return (
            <div
              key={message.id}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
              ref={ref}
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
              <div className={`chat-bubble m-1 ${bubbleClass}`}>
                {message.text}
              </div>
              <div className="chat-footer text-xs opacity-50">
                <time className="text-xs text-zinc-500">
                  {new Date(message.date.seconds * 1000).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
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
