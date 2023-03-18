import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
            navigate("/login");
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
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form
              method="POST"
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="name@email.com"
                  required
                />
                {err && (
                  <span className="text-center text-sm font-bold text-red-500">
                    {err}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm ${
                    !passwordsMatch ? " focus:text-red-500" : ""
                  }`}
                  pattern=".{8,}"
                  title="8 characters minimum"
                  required
                  onChange={handleChange}
                />
                <p className="text-xs text-neutral-700">
                  Passwords must be min. 8 characters
                </p>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm ${
                    !passwordsMatch ? "focus:text-red-500" : ""
                  }`}
                  required
                  pattern=".{8,}"
                  title="8 characters minimum"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!passwordsMatch ? (
                  <p className="text-xs text-red-500">
                    Passwords do not match!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Select a profile picture
                </label>
                <div
                  className="flex w-full items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label
                    htmlFor="file"
                    className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100"
                  >
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected file"
                        className="h-full w-full rounded-lg object-contain"
                      />
                    ) : (
                      <div className="relative flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                      </div>
                    )}
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                      required
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-black px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-neutral-800  focus:outline-none focus:ring-4 focus:ring-violet-300"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?
                <Link
                  to="/login"
                  className="font-black text-black hover:underline"
                >
                  Log in
                </Link>
              </p>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold ">or</p>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  to="#"
                  className="group flex items-center justify-center space-x-2 rounded-md border border-gray-800 px-4 py-2 transition-colors duration-300 hover:bg-gray-800 focus:outline-none"
                >
                  <span>
                    <svg
                      className="h-5 w-5 fill-current text-gray-800 group-hover:text-white"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Sign up with GitHub
                  </span>
                </Link>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  to="#"
                  className="group flex items-center justify-center space-x-2 rounded-md border border-gray-800 px-4 py-2 transition-colors duration-300 hover:bg-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-5 w-5 fill-current text-gray-800 group-hover:text-white"
                    viewBox="0 0 533.5 544.3"
                  >
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Sign up with Google
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-5 text-center font-black transition duration-300 hover:text-white">
          <Link to="/">Go back to the homepage</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
