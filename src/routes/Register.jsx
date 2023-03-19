import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [err, setErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setConfirmEmail(value);
    } else if (name === "password") {
      setUserPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPassword === confirmPassword) {
      try {
        const { value: displayName } = e.target[0];
        const { value: email } = e.target[1];
        const { value: password } = e.target[2];
        const file = e.target[4].files[0];

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});

            console.log("File available at", downloadURL);
            navigate("/");
          });
        });

        const user = res.user;
        console.log(user);
      } catch (error) {
        console.log(error);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErr("This email address is already in use.");
        } else {
          setErr(error.message);
        }
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  useEffect(() => {
    setPasswordsMatch(userPassword === confirmPassword);
  }, [userPassword, confirmPassword]);

  return (
    <section className="h-auto bg-sky-400 font-fontInforma">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-auto md:py-3.5">
        <Link
          to="/"
          className="mb-6 flex items-center font-fontNove text-2xl font-semibold text-gray-900"
        >
          <img
            className="mr-2 h-8 w-8"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          SpeakEasy
        </Link>
        <RegisterForm
          handleSubmit={handleSubmit}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
          handleFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          handleChange={handleChange}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          err={err}
        />

        <div className="mt-5 text-center font-black transition duration-300 hover:text-white">
          <Link to="/">Go back to the homepage</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
