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
    <ul className="overflow-auto sm:invisible md:visible">
      <h2 className="text-md my-2 mb-2 ml-2 font-fontNove text-black ">
        Chats
      </h2>
      <li>
        {Object.entries(messages)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((message) => (
            <Link
              className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
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
                  <span className="ml-2 block font-semibold text-gray-600">
                    {message[1]?.userInfo.displayName}
                  </span>
                  <span className="ml-2 block text-sm text-gray-600">
                    6 hour
                  </span>
                </div>
                <span className="ml-2 block text-sm text-gray-600">
                  {message[1]?.lastMessage?.text}
                </span>
              </div>
            </Link>
          ))}
      </li>
    </ul>
  );
};

export default Messages;
