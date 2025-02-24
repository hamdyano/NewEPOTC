import WomenRoll1 from "../assets/catActimages/WomenRoll1.jpg";
import WomenRoll2 from "../assets/catActimages/WomenRoll2.jpg";

function WomenRoll() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={WomenRoll1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            (Closing ceremony of the Women's Role as a Police or Civilian
            Element in Peacekeeping Missions)
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c]  text-1xl tracking-tighter">
            The Police Academy (Training and Development College "EPOTC")
            organized a celebration on the occasion of the conclusion of the
            training course entitled (The Role of Women as Police / Civilian
            Component in Peacekeeping Missions) which was held at the
            headquarters of the (EPOTC), from 18/5/2024 to 14/6/2024, for
            African security cadres with the participation of (23) female
            trainees representing (23) African countries.
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            The ceremony was attended by Major General / Director of the
            Training and Development College
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            on behalf of Major General / Assistant Minister, President of the
            Police Academy, and Mr. Ambassador / Secretary General of the (EAPD)
            at the Ministry of Foreign Affairs, and a number of leaders and
            officers of the Training and Development College "EPOTC". During his
            speech, Major General / Director of the Training and Development
            College conveyed the greetings of H.E the Minister of Interior, and
            His Excellency's prime attention to the activities of these courses
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={WomenRoll2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default WomenRoll;
