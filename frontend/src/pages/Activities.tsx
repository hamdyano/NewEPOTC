import act1 from "../assets/catActimages/act1.jpg";
import visit1 from "../assets/catActimages/visit1.jpg";

function Activities() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={act1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            End of the training activities of the Training Year 2022/2023
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c]  text-1xl tracking-tighter">
            During the current training year, EPOTC has qualified 254 male and
            female officers from various departments of the Ministry to take the
            United Nations S.A.A.T tests. Furthermore, English and French
            language exams in addition to shooting and personality traits tests
            were conducted for 298 male and female officers nominated to work
            within formed police units for peacekeeping missions. In the context
            of the constructive cooperation between the Ministry of Interior,
            represented by the Police Academy, the Ministry of Foreign Affairs
            represented by the Egyptian Agency of Partnership for Development,
            the African Union, North African Regional Capability and the United
            Nations, EPOTC has trained and qualified 488 security cadres from
            African, Asian, and Commonwealth countries participating in UN
            missions, representing 56 countries
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            The Visit of Mr. Jean-Pierre Lacroix
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            The Police Academy received Mr./ Under-Secretary-General for Peace
            Operations at the United Nations and his accompanying delegation.
            The visit included discussions about ways to enhance aspects of
            joint cooperation within the framework of supporting United Nations'
            efforts in maintaining international peace and security. The
            Under-Secretary-General for Peace Operations and the accompanying
            delegation were received by Major General/ Assistant Minister of
            Interior, President of the Police Academy along with a number of
            Police Academy's leaders and officers.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={visit1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Activities;
