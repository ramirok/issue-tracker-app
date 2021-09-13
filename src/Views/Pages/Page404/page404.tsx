const Page404 = (): JSX.Element => {
  return (
    <div className=" w-full relative">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden rounded-xl pb-8 mb-20">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-300">404</h1>
            <h1 className="text-6xl font-medium py-8">Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              The page you are looking for does not exist. It might have been
              moved or deleted.
            </p>
            <a
              href="/"
              className="bg-purple-500  text-white font-semibold text-2xl px-6 py-3 rounded-md"
            >
              HOME
            </a>
          </div>
        </div>
      </div>

      <footer className="h-40 w-full flex justify-center items-center text-2xl text-gray-600 bg-white absolute bottom-0">
        Copyright 2021 - Luis Ramiro Krupoviesa
      </footer>
    </div>
  );
};
export default Page404;
