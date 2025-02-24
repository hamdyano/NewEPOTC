import workshops1 from "../assets/catActimages/workshops1.jpg";
import workshops2 from "../assets/catActimages/workshops2.jpg";

function WorkShops() {
  return (
    // bg-[#1c5a7c]
    <div className=" flex flex-col gap-12">
      {/*for the crad*/}

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={workshops1}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter ">
            Training Workshop: "Review of the Framework and Policies of the
            Police Component"
          </h2>{" "}
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className=" text-[#264e7c]  text-1xl tracking-tighter">
            A training workshop under the title "Review of the Framework and
            Policies of the Police Component" was organized in cooperation with
            the North African Regional Capability within the African Standby
            Force. It was held from 4th to7th June 2023 and attended by 18
            participants from the executive secretariat of the Capability and
            the African Union Commission, as well as representatives of member
            states. The workshop aimed to clarify the role of the police
            component in peace support operations and to reach a clear
            definition of the importance of the police component's roles and
            responsibilities, formulating them into unified regional policies
            and documents.
          </p>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-3xl tracking-tighter">
            Workshop was held as a part of the North African Regional
            Capability's recognition of EPOTC
          </h2>
          <div className="w-20 border-b-2 border-white my-2"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter">
            as a regional center of excellence for the police component; given
            the Center's advanced training and logistical capabilities and its
            ongoing efforts in training and building the capabilities of peace
            support and peacekeeping cadres, not only at the national level but
            also at the regional and international levels. At the end of the
            workshop, several recommendations were presented, including
            consulting member states about the suggested guidelines for
            individual police officers and formed police units; to provide their
            feedback.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={workshops2}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default WorkShops;
