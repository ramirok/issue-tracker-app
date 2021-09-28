import Head from "next/head";
import LoadingSpinner from "./loadingSpinner";

const Loading = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="h-1/4 w-1/4 mb-72 bg-white rounded-2xl flex justify-center items-center shadow-lg">
          <LoadingSpinner className="h-1/2 text-purple-500 animate-spin" />
        </div>
      </div>
    </>
  );
};

export default Loading;
