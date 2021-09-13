const Landing = (): JSX.Element => {
  return (
    <>
      <section className="bg-white flex flex-col items-center py-20 sm:py-32 px-6 md:px-14 w-full 2xl:px-32 md:flex-row text-center md:text-left">
        <div className="w-full md:w-1/2 md:mr-10 md:mb-0 mb-20">
          <h2 className="text-7xl leading-tight lg:leading-relaxed font-bold">
            Make project managment easy with{" "}
            <strong className="font-black border-b-8 border-purple-300">
              Issue Tracker
            </strong>
          </h2>
          <p className="text-3xl text-gray-600 mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            molestias. Quasi magnam quae unde dolorum veniam explicabo iusto
            corrupti voluptas officia? Minima dolor quas commodi iusto illo eum
            sequi reiciendis?
          </p>
        </div>

        <div className="lg:h-auto w-full md:w-1/2 flex relative justify-center">
          <div className="bg-purple-200 rounded-3xl pb-10 h-80 w-80 rounded-l-nonea absolute -top-10 left-0" />
          <div className="bg-green-200 rounded-3xl pb-10 h-80 w-80 rounded-l-nonea absolute -bottom-10 sm:left-56" />
          <img
            src="/assets/pm-illustration.jpg"
            alt="project manager"
            className="block rounded-2xl h-auto w-auto max-w-md sm:max-w-xl lg:max-w-2xl shadow-lg z-10 transform scale-110"
          />
          <div className="bg-purple-200 rounded-3xl pb-10 h-80 w-80 rounded-l-nonea absolute -bottom-10 right-0" />
          <div className="bg-yellow-200 rounded-3xl pb-10 h-80 w-80 rounded-l-nonea absolute -top-10 sm:right-56" />
        </div>
      </section>

      <section className="flex pt-20 sm:py-14 py-6 md:px-14 w-full justify-between 2xl:px-32">
        <div className="xl:w-2/3 lg:w-3/4 w-full">
          <img
            alt="dashboard"
            src="/assets/dashboard.png"
            className="h-auto w-full rounded-lg"
          />
        </div>

        <div className="w-1/4 xl:w-1/3 justify-evenly hidden lg:flex">
          <img
            alt="dashboard"
            src="/assets/mobile.png"
            className="max-w-xs rounded-lg object-contain self-end"
          />
          <img
            alt="dashboard"
            src="/assets/mobile-2.png"
            className="max-w-xs rounded-lg object-contain self-start mt-14 hidden xl:block"
          />
        </div>
      </section>

      <section className="bg-white flex flex-wrap items-center xl:justify-around justify-center px-6 md:px-14 2xl:px-32">
        <div className="mx-8 my-10 flex-shrink-0 relative overflow-hidden bg-white rounded-2xl max-w-lg shadow-lg">
          <div className="relative px-6 my-6">
            <h3 className="block font-semibold text-3xl">Assign Roles</h3>
          </div>
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="200"
              y="100"
              width="152"
              height="152"
              rx="8"
              fill="#A7F3D0"
            ></rect>
            <rect
              y="10"
              x="20"
              width="152"
              height="152"
              rx="8"
              fill="#A7F3D0"
            ></rect>
          </svg>
          <div className="relative px-10 flex items-center justify-center">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
            <img
              className="relative w-96 rounded-2xl"
              src="/assets/roles-illustration.jpg"
              alt="shopping item"
            />
          </div>
          <div className="relative px-6 pb-6 mt-6">
            <span className="block opacity-75 mb-1 text-2xl font-bold">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              quo quidem!
            </span>
          </div>
        </div>
        <div className="mx-8 my-10 flex-shrink-0 relative overflow-hidden bg-white rounded-2xl max-w-lg shadow-lg">
          <div className="relative px-6 my-6">
            <span className="block font-semibold text-3xl">
              Create Projects
            </span>
          </div>
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="159.52"
              y="10"
              width="152"
              height="152"
              rx="8"
              fill="#FDE68A"
            ></rect>
            <rect
              y="107.48"
              x="10"
              width="152"
              height="152"
              rx="8"
              fill="#FDE68A"
            ></rect>
          </svg>
          <div className="relative px-10 flex items-center justify-center">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
            <img
              className="relative w-96 rounded-2xl"
              src="/assets/projects-illustration.png"
              alt="shopping"
            />
          </div>
          <div className="relative  px-6 pb-6 mt-6">
            <span className="block opacity-75 mb-1 text-2xl font-bold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia.
            </span>
          </div>
        </div>
        <div className="mx-8 my-10 flex-shrink-0 relative overflow-hidden bg-white rounded-2xl max-w-lg shadow-lg">
          <div className="relative px-6 my-6">
            <span className="block font-semibold text-3xl">Create Tickets</span>
          </div>
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
          >
            <rect
              x="20"
              y="20"
              width="152"
              height="152"
              rx="8"
              fill="#DDD6FE"
            ></rect>
            <rect
              y="90"
              x="210"
              width="152"
              height="152"
              rx="8"
              fill="#DDD6FE"
            ></rect>
          </svg>
          <div className="relative px-10 flex items-center justify-center">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
            <img
              className="relative w-96 rounded-2xl"
              src="/assets/ticket-illustration.jpg.png"
              alt="shopping"
            />
          </div>
          <div className="relative  px-6 pb-6 mt-6">
            <span className="block opacity-75 mb-1 text-2xl font-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
        </div>
      </section>

      <footer className="h-40 w-full flex justify-center items-center text-2xl text-gray-600">
        Copyright 2021 - Luis Ramiro Krupoviesa
      </footer>
    </>
  );
};

export default Landing;
