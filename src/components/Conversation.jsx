import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import MessageInput from "./MessageInput";

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
      <div className="relative flex items-center border-b bg-black p-3 md:rounded-tr-xl">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={data.user?.photoURL}
          alt="username"
        />
        <span className="ml-2 block font-bold text-white">
          {data.user?.displayName}
        </span>
      </div>
      <div
        className="relative h-[40rem] w-full overflow-y-auto bg-white p-6 md:h-[35rem]
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
                {message.img && (
                  <img
                    src={message.img}
                    alt=""
                    className="h-30 w-40 rounded-xl object-contain"
                  />
                )}

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
      <MessageInput />
    </div>
  );
};

export default Conversation;
