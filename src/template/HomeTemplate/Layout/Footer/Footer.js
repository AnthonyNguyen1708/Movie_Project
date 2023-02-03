import React from "react";
import { AppleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Footer = (props) => {
  const cinemas = useSelector((state) => state.movie.cinemaSystem);

  return (
    // <footer className="py-6 bg-coolGray-100 text-coolGray-900 bg-gray-800">
    //   <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
    //     <div className="grid grid-cols-12">
    //       <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
    //         <a className="flex justify-center space-x-3 md:justify-start text-black">
    //           <img
    //             src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
    //             alt="cyberlearn.vn"
    //           />
    //         </a>
    //       </div>
    //       <div className="col-span-6 text-center md:text-left md:col-span-3">
    //         <p className="pb-1 text-lg font-medium text-white">PARTNER</p>
    //         <div className="grid grid-cols-3" style={{ color: "#fff" }}>
    //           {cinemas.map((item, index) => {
    //             return (
    //               <div key={index}>
    //                 <img src={item.logo} style={{ width: 50 }} />
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </div>
    //       <div className="col-span-6 text-center md:text-left md:col-span-3 text-white">
    //         <p className="pb-1 text-lg font-medium">Mobile app</p>
    //         <div className="flex text-white">
    //           <div className="mr-5">
    //             <AppleOutlined className="text-2xl" />
    //           </div>
    //           <div>
    //             <FacebookOutlined className="text-2xl" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="grid justify-center pt-6 lg:justify-between text-white">
    //       <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
    //         <span>©2021 All rights reserved</span>
    //       </div>

    //       <div className=""></div>
    //     </div>
    //   </div>
    // </footer>
    <div
      style={{
        backgroundColor: "#212121",
      }}
      className="py-10 text-white"
    >
      <div
        style={{
          maxWidth: "1000px",
        }}
        className="mx-auto"
      >
        <div className="grid grid-cols-12">
          <div className="col-span-4 px-2 text-sm">
            <p className="mb-5">CYBER MOVIE</p>
            <div className="flex justify-between">
              <div>FAQ</div>
              <div>Thỏa thuận sử dụng</div>
            </div>
            <div className="flex justify-between">
              <div>Brand Guidelines</div>
              <div>Chính sách bảo mật</div>
            </div>
          </div>
          <div className="col-span-4 mx-4">
            <p className="mb-5 text-center">ĐỐI TÁC</p>
            <div className="grid grid-cols-3" style={{ color: "#fff" }}>
              {cinemas.map((item, index) => {
                return (
                  <div className="flex justify-center my-2" key={index}>
                    <img src={item.logo} style={{ width: 35 }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-4 px-2">
            <div className="flex">
              <div className="w-1/2">
                <p>MOBILE</p>
                <div class="flex">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    class="text-4xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    class="text-4xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M270.1 741.7c0 23.4 19.1 42.5 42.6 42.5h48.7v120.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V784.1h85v120.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V784.1h48.7c23.5 0 42.6-19.1 42.6-42.5V346.4h-486v395.3zm357.1-600.1l44.9-65c2.6-3.8 2-8.9-1.5-11.4-3.5-2.4-8.5-1.2-11.1 2.6l-46.6 67.6c-30.7-12.1-64.9-18.8-100.8-18.8-35.9 0-70.1 6.7-100.8 18.8l-46.6-67.5c-2.6-3.8-7.6-5.1-11.1-2.6-3.5 2.4-4.1 7.4-1.5 11.4l44.9 65c-71.4 33.2-121.4 96.1-127.8 169.6h486c-6.6-73.6-56.7-136.5-128-169.7zM409.5 244.1a26.9 26.9 0 1 1 26.9-26.9 26.97 26.97 0 0 1-26.9 26.9zm208.4 0a26.9 26.9 0 1 1 26.9-26.9 26.97 26.97 0 0 1-26.9 26.9zm223.4 100.7c-30.2 0-54.6 24.8-54.6 55.4v216.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V400.1c.1-30.6-24.3-55.3-54.6-55.3zm-658.6 0c-30.2 0-54.6 24.8-54.6 55.4v216.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V400.1c0-30.6-24.5-55.3-54.6-55.3z"></path>
                  </svg>
                </div>
              </div>
              <div className="w-1/2">
                <p>SOCIAL</p>
                <div class="flex">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    class="text-4xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    class="text-4xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
