import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UsernameMenu from "./UsernameMenu";
import { useAppContext } from "@/contexts2/AppContext";

const MainNav = () => {
  
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang); // Change the language based on the flag clicked
  };

  const { isLoggedIn } = useAppContext();
  return (
    <span className="flex items-center space-x-4">
      {/* Navigation Links */}

      <Link
        to="/"
        className="text-[#ffffff] text-center font-bold  md:text-xs lg:text-base hover:text-[#fc9948] py-2 rounded-lg px-3 font-['Roboto'] mr-12 "
      >
        {t('Home')}
      </Link>

      <div className="relative group">
        {/* Dropdown Trigger */}
        <Link
          to="/aboutus"
          className="text-[#ffffff] text-center font-bold md:hidden lg:block md:text-xs lg:text-base hover:text-[#fc9948] py-2 rounded-lg px-3 font-['Roboto']  mr-12"
        >
          {t('About Us')}
        </Link>

        {/* Dropdown Menu about us //////////////////////////////////*/}

        <div className="hidden group-hover:flex flex-col absolute bg-white shadow-lg rounded-lg left-0 top-full mt-1 w-48 z-10">
          <Link
            to="/FactsAndStatistics"
            className="text-[#133355]  font-semibold text-left px-4 py-2 text-sm hover:bg-[#fc9948] hover:text-white"
          >
            →       {t('Facts and Statistics')}
          </Link>
          <div className="h-[1px] bg-gray-200 my-1"></div>
          <Link
            to="/partnership"
            className="text-[#133355] font-semibold text-left px-4 py-2 text-sm hover:bg-[#fc9948] hover:text-white"
          >
            →  {t('Partnership')}
          </Link>
        </div>
      </div>

      <div className="relative group">
        {/* Dropdown Trigger */}
        <Link
          to="/NewsAndEvents"
          className="text-[#ffffff] text-center font-bold md:hidden lg:block md:text-xs lg:text-base hover:text-[#fc9948] py-2 rounded-lg px-3 font-['Roboto']  mr-12"
        >
         {t('News & Events')}
        </Link>



       

        
      </div>

      <div className="relative group">
        {/* Dropdown Trigger */}
        <Link
          to="/"
          className="text-[#ffffff] text-center font-bold md:hidden lg:block md:text-xs lg:text-base hover:text-[#fc9948] py-2 rounded-lg px-3 font-['Roboto']  mr-12"
        >
            {t('Gallery')}
        </Link>

        {/* Dropdown Menu Events //////////////////////////////////*/}

        <div className="hidden group-hover:flex flex-col absolute bg-white shadow-lg rounded-lg left-0 top-full mt-1 w-48 z-10">
          <Link
            to="/Allphotos"
            className="text-[#133355]  font-semibold text-left px-4 py-2 text-sm hover:bg-[#fc9948] hover:text-white"
          >
            →   {t('All Photos')}
          </Link>
          <div className="h-[1px] bg-gray-200 my-1"></div>

          <Link
            to="/Videos"
            className="text-[#133355] font-semibold text-left px-4 py-2 text-sm hover:bg-[#fc9948] hover:text-white"
          >
            → {t('Videos')}

           
          </Link>
        </div>
      </div>


      <div>
        <Link
          to="/ContactUs"
          className="text-[#ffffff] text-center font-bold md:text-xs lg:text-base hover:text-[#fc9948] py-2 rounded-lg px-3 font-['Roboto'] mr-12 "
        >
           {t('Contact Us')}
        </Link>
      </div>






      <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
            
            
            <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/AddingPhotos"
              >
                Adding Photos
              </Link>

            <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/AddingPartner"
              >
                Adding Partner
              </Link>

              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/MyNews"
              >
                Adding News
              </Link>

          

              <UsernameMenu />
           
            </>
          ) : (
            <Link
              to="/signin"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
      
            </Link>
          )}

        </span>







      <div className="flex flex-col gap-2 ml-12">
        {/* Egyptian Flag (AR) */}
        <button
          onClick={() => handleLanguageChange("ar")}
          className="flex items-center gap-2 text-[#ffffff] text-xs md:text-sm lg:text-base hover:text-[#fc9948] font-['Roboto']"
        >
          <span className="text-xs md:text-sm lg:text-base">AR</span>
          <Flag code="EG" className="w-6 h-6" />
        </button>

        {/* UK Flag (EN) */}
        <button
          onClick={() => handleLanguageChange("en")}
          className="flex items-center gap-2 text-[#ffffff] text-xs md:text-sm lg:text-base hover:text-[#fc9948] font-['Roboto']"
        >
          <span className="text-xs md:text-sm lg:text-base">EN</span>
          <Flag code="GB" className="w-6 h-6" />
        </button>

        {/* French Flag (FR) */}
        <button
          onClick={() => handleLanguageChange("fr")}
          className="flex items-center gap-2 text-[#ffffff] text-xs md:text-sm lg:text-base hover:text-[#fc9948] font-['Roboto']"
        >
          <span className="text-xs md:text-sm lg:text-base">FR</span>
          <Flag code="FR" className="w-6 h-6" />
        </button>
      </div>


      
   


    </span>
  );
};

export default MainNav;












