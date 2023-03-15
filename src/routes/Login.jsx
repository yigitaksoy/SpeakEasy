import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="h-screen bg-sky-400 font-fontInforma  ">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Welcome back!
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 "
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300  h-4 w-4 rounded border border-gray-300 bg-gray-50"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="#"
                  className="text-sm font-black text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-black px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-neutral-800  focus:outline-none focus:ring-4 focus:ring-violet-300"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?
                <Link
                  to="/register"
                  class="font-black text-black hover:underline"
                >
                  Sign up
                </Link>
              </p>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold ">or</p>
              </div>
              <div className="flex flex-col space-y-4">
                <Link
                  to="#"
                  class="group flex items-center justify-center space-x-2 rounded-md border border-gray-800 px-4 py-2 transition-colors duration-300 hover:bg-gray-800 focus:outline-none"
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
                    Github
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

export default Login;
