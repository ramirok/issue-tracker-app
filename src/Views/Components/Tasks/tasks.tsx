import { CheckCircleIcon } from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleIconComplete } from "@heroicons/react/solid";

const Tasks = (): JSX.Element => {
  return (
    <div>
      <div className="mb-4 mx-0 mr-4 h-fulla">
        <ul className="shadow-lg rounded-2xl bg-white w-full h-full">
          <li className="flex items-center text-gray-600 justify-between py-3 border-b-2 border-gray-100 ">
            <div className="flex items-center justify-start ">
              <span className="mx-4">01</span>
              <span>Create wireframe</span>
            </div>
            <CheckCircleIcon className="w-10 h-10 text-gray-400 mx-4" />
          </li>
          <li className="flex items-center text-gray-600  justify-between py-3 border-b-2 border-gray-100 ">
            <div className="flex items-center justify-start ">
              <span className="mx-4">02</span>
              <span>Dashboard design</span>
              <span className="lg:ml-6 ml-2 flex items-center text-gray-400 ">
                3
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="ml-1"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="mx-4 flex items-center text-gray-400 ">
                3
                <svg
                  width="15"
                  height="15"
                  className="ml-1"
                  fill="currentColor"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8c-.6 16.1-4.2 28.5-11 36.9c-15.4 19.2-49.3 22.4-85.2 25.7c-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3c0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6c3.1-5.2 7.8-9.8 14.9-13.4c16.2-8.2 40.4-10.4 66.1-12.8c42.2-3.9 90-8.4 118.2-43.4c14-17.4 21.1-39.8 21.6-67.9c31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </div>
            <CheckCircleIcon className="w-10 h-10 text-gray-400 mx-4" />
          </li>
          <li className="flex items-center text-gray-600  justify-between py-3 border-b-2 border-gray-100 ">
            <div className="flex items-center justify-start ">
              <span className="mx-4">03</span>
              <span>Components card</span>
              <span className="lg:ml-6 ml-2 flex items-center text-gray-400 ">
                3
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="ml-1"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </div>
            <CheckCircleIcon className="w-10 h-10 text-gray-400 mx-4" />
          </li>
          <li className="flex items-center text-gray-400 justify-between py-3 border-b-2 border-gray-100 ">
            <div className="flex items-center justify-start ">
              <span className="mx-4">04</span>
              <span className="line-through">Google logo design</span>
            </div>
            <CheckCircleIconComplete className="w-10 h-10 text-green-500 mx-4" />
          </li>
          <li className="flex items-center text-gray-400  justify-between py-3 border-b-2 border-gray-100 ">
            <div className="flex items-center justify-start ">
              <span className="mx-4">05</span>
              <span className="line-through">Header navigation</span>
            </div>
            <CheckCircleIconComplete className="w-10 h-10 text-green-500 mx-4" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
