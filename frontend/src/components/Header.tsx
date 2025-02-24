import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import transLogo from "../assets/transLogo.png";


const Header = () => {
  return (
    <div className="bg-[#133355] py-2">
      {/* Changed from "container" to "w-full" */}
      <div className="w-full flex justify-between items-center px-4 md:px-12 ">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex flex-col items-center text-center lg:ml-38  "
        >
          <img
            src={transLogo}
            alt="Logo"
            className="h-16 w-auto md:h-24 md:w-auto lg:h-32 object-contain"
          />
          <span className="text-xs md:text-sm text-[#ffffff] mt-1 font-semibold font['Roboto']">
            EPOTC
          </span>
        </Link>



        {/* Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>


      </div>
    </div>
  );
};

export default Header;



/* 

  <div className="flex-grow flex justify-center mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#133355] w-full max-w-md"
          />
        </div>


*/


/*
bg-black bg-opacity-50 
*/

/* bg-[#0c4a6e]*/