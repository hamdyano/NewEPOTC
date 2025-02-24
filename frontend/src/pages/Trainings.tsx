import Training100 from "../assets/catActimages/Training100.jpg";
import Nelson from "../assets/catActimages/Nelson.jpg";

function Trainings() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={Training100}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            Pre-Deployment Training for Individual Police Officers (IPOs)
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c] text-1xl tracking-tighter">
            The Egyptian Peacekeeping Operations Training Center conducted a
            Pre-Deployment Training for Individual Police Officers (IPOs). It
            was held over six weeks for security cadres from Commonwealth
            countries, with 22 participants from eight countries. This course
            aimed at preparing and qualifying police cadres nominated for
            participation in peacekeeping operations under the UN umbrella. They
            were provided with the necessary knowledge and skills to perform
            their duties according to international standards and the UN core
            values. The course was also meant to unify training concepts, which
            enhances the capabilities of police cadres in the training field
            before deployment for peacekeeping operations.
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            Training Course on Nelson Mandela Rules for the Treatment of Inmates
            in Correctional and Rehabilitation Centers
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            Following the Ministry of Interior's strategy, that is based, in one
            of its axes, on the permanent and continuous advancement of the
            scientific and cultural level of all its personnel and the
            qualification, training and raising the capabilities of security
            cadres. The Police Academy concluded the preparing activities of
            trainees on the "Nelson Mandela Rules for the Treatment of Inmates
            in Correctional and Rehabilitation Centers" at the headquarters of
            the (EPOTC) affiliated with the Training and Development College at
            the Police Academy, which was held over 3 days in cooperation with
            the United Nations Office on Drugs and Crime (UNODC) with the
            participation of a number of male and female officers of the
            Ministry.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={Nelson}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Trainings;
