import activityimage from "../assets/activityimage.jpg";
import Redcross from "../assets/Redcross.jpg";
import workshops from "../assets/workshops.jpg";
import womenRoll from "../assets/womenRoll.jpg";
import trainings from "../assets/trainings.jpg";
import CivilProtection from "../assets/CivilProtection.jpg";
import { Link } from "react-router-dom";


function CategoriesActivities() {
  return (


    
    <div className="bg-[#fdfdfd] px-8 pb-10">


      <div>
        <div className=" bg-[#0d223a] rounded-2xl shadow-md py-8 flex flex-col gap-7 text-center -mt-6">
          <h1 className="text-4xl font-bold text-[#fdfdfd] tracking-tighter">
            Main Categories & Activities
          </h1>
          <div className="flex justify-center">
            <div className="w-20 border-b-2 border-[#cf6439] my-2"></div>
          </div>
          <span className="text-[#fdfdfd] text-xl tracking-tighter">
            The inauguration of the EPOTC marked the success of the Egyptian
            MOI's efforts and expertise in the field of peacekeeping operations
          </span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2  mt-8">
        {/* Row 1 */}
        <Link to="/Activities" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={activityimage}
              alt="Political Activities"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg   hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
              Activities
              </span>
            </div>
          </div>
        </Link>

        <Link to="/RedCross" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={Redcross}
              alt="Red Cross"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg  hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
                The Red Cross
              </span>
            </div>
          </div>
        </Link>

        {/* Row 2 */}
        <Link to="/Workshops" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={workshops}
              alt="Workshops"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg   hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
                Workshops
              </span>
            </div>
          </div>
        </Link>

        <Link to="/WomenRoll" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={womenRoll}
              alt="Women Roll"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg  hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
                Women Roll
              </span>
            </div>
          </div>
        </Link>

        {/* Row 3 */}
        <Link to="/Trainings" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={trainings}
              alt="Trainings"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg  hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
                Trainings
              </span>
            </div>
          </div>
        </Link>

        <Link to="/CivilProtection" className="w-full">
          <div className="relative h-[300px] group">
            <img
              src={CivilProtection}
              alt="Civil Protection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white font-bold text-lg hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center opacity-100 transition-opacity duration-300">
                Civil Protection
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CategoriesActivities;
