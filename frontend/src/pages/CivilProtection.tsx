import Civil1 from "../assets/catActimages/Civil1.jpg";
import Civil2 from "../assets/catActimages/Civil2.jpg";

function CivilProtection() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={Civil1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            Protection of Civilians in Conflict Areas" Training Course
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c] text-1xl tracking-tighter">
            The Police Academy, in coordination with the Egyptian Agency of
            Partnership for Development-affiliated to the Ministry of Foreign
            Affairs- conducted the eighth training course on "Protection of
            Civilians in Conflict Areas". 35 trainees from African security
            cadres representing 14 African countries attended the course. It was
            held from 7th December 2022 to 12th January 2023, aiming to train
            African security cadres on the missions of protecting civilians in
            host countries of peacekeeping operations, particularly vulnerable
            groups such as women and children.
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            The Second round of Protection of Civilians in Conflict Areas
            Training Course
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            The Police Academy (Training and Development College, "EPOTC") held
            a ceremony to mark the end of the Protection of Civilians in
            Conflict Areas training course. It was held at EPOTC from 25th
            November 2023, to 21st December 2023. Twenty-four trainees
            representing 14 African countries have participated in this course.
            Major General/ Assistant Minister of Interior attended the ceremony
            along with the Ambassador/Secretary-General of the Egyptian Agency
            of Partnership for Development affiliated to the Ministry of Foreign
            Affairs, and several leaders and officers from Training and
            Development College and EPOTC.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={Civil2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default CivilProtection;
