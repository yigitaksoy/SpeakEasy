import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { PaperClipIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const messageId = uuid();
      const storageRef = ref(storage, messageId);
      const uploadTask = uploadBytesResumable(storageRef, image);

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: messageId,
            text: "",
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      } catch (error) {
        console.info(error);
      }
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend();
      setText("");
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-br-lg bg-white p-3 shadow-lg">
      <div>
        <input
          type="file"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
        <label htmlFor="file">
          <PaperClipIcon className="h-5 w-5 -rotate-12 cursor-pointer text-gray-500" />
        </label>
      </div>

      <input
        type="text"
        placeholder="Type a message"
        className="input mx-3 block w-full bg-gray-100 py-2 pl-4 text-black outline-none focus:outline-none"
        name="message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
      />
      <button onClick={handleSend}>
        <PaperAirplaneIcon className="h-5 w-5 -rotate-12 text-gray-500" />
      </button>
    </div>
  );
};

export default MessageInput;
