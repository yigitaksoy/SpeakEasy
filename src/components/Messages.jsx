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

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="overflow-auto sm:invisible md:visible">
      <h2 className="text-md my-2 mb-2 ml-2 font-fontNove text-black ">
        Chats
      </h2>
      <div>
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
              className="bg-natural-200 mb-2 flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm shadow-lg transition duration-150 ease-in-out hover:bg-gray-100"
              key={message[0]}
              onClick={() => handleSelect(message[1].userInfo)}
            >
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={message[1]?.userInfo.photoURL}
                alt="username"
              />
              <div className="w-full pb-2">
                <div className="flex justify-between">
                  <span className="ml-2 block font-black text-black">
                    {message[1]?.userInfo.displayName}
                  </span>
                  <span className="ml-2 block text-sm text-black">
                    <time className="text-xs text-zinc-500">
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
                <span className="ml-2 block text-sm text-gray-500">
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
