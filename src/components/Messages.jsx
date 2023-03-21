import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const getMessages = () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setMessages(doc.data());
        } else {
          setDoc(docRef, {});
        }
      });
      return () => unsubscribe();
    };
    currentUser.uid && getMessages();
  }, [currentUser.uid]);

  const handleSelect = (user, messageId) => {
    setSelectedMessage(messageId);
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="overflow-auto sm:invisible md:visible">
      <h2 className="text-md my-2 mb-2 ml-2 font-fontNove text-black ">
        Chats
      </h2>
      <div className="p-2">
        {Object.entries(messages)
          ?.sort((a, b) => {
            if (b[1].date && a[1].date) {
              return b[1].date - a[1].date;
            } else {
              return 0;
            }
          })
          .map((message) => (
            <Link
              className={`bg-natural-200 mb-2 flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm shadow-lg ${
                selectedMessage === message[0]
                  ? "text-bold  hover: bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              key={message[0]}
              onClick={() => handleSelect(message[1].userInfo, message[0])}
            >
              <div className="indicator avatar">
                {/* New message notification */}
                <div className="h-10 w-10 rounded-full">
                  <img src={message[1]?.userInfo.photoURL} alt="username" />
                </div>
              </div>
              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span
                    className={`ml-2 block font-black ${
                      selectedMessage === message[0]
                        ? "bg-black text-white"
                        : "text-black"
                    }`}
                  >
                    {message[1]?.userInfo.displayName}
                  </span>
                  <span className="ml-2 block text-sm">
                    <time
                      className={`text-[0.6rem] ${
                        selectedMessage === message[0]
                          ? " text-white"
                          : " text-zinc-500"
                      }`}
                    >
                      {message[1]?.date &&
                        new Date(
                          message[1].date.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                    </time>
                  </span>
                </div>
                <span className="ml-2 block text-sm text-gray-500 line-clamp-1">
                  {message[1]?.lastMessage?.text}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Messages;
