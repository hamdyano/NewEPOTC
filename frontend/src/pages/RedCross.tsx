import RedCross1 from "../assets/catActimages/RedCross1.jpg";
import RedCross2 from "../assets/catActimages/RedCross2.jpg";
function RedCross() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={RedCross1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            Two Training Courses on "International Humanitarian Law and the Role
            of the International Committee of the Red Cross in Conflict Areas"
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c]  text-1xl tracking-tighter">
            The Police Academy hosted two training courses under the title of
            "International Humanitarian Law and the Role of the International
            Committee of the Red Cross in Conflict Areas". They were conducted
            on 24th and 25th July 2023 in collaboration with the International
            Committee of the Red Cross, with the participation of several
            ministry officers.
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            The training courses included specialized lectures on international
            humanitarian law
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            These courses were part of the on-going cooperation between the
            Police Academy and the International Committee of the Red Cross.
            They covered various training fields some of which are related to
            international humanitarian law. The courses aimed to train cadres
            nominated to participate in peacekeeping missions and raise their
            awareness of the significant role played by the International
            Committee of the Red Cross in conflict areas and the application of
            international humanitarian law; emphasizing its importance in
            protecting civilians, especially vulnerable groups.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={RedCross2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default RedCross;
