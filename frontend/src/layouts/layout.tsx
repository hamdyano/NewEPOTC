import AboutHero from "@/components/AboutHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";


type Props = {
  children: React.ReactNode;
  showHero ? : boolean;
  showAboutHero ? :String | boolean;

  
};

const Layout = ({ children , showHero = false ,showAboutHero = false}: Props) => {
  return (
    <div className=" bg-[#ffffff] flex flex-col min -h-screen">
      <Header />
      {showHero && <Hero /> }
      {showAboutHero && <AboutHero />}


      
      
      <div className="container mx-auto flex-1 py-10"> {children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;


/*  
showHeroVideo

 {showHeroVideo && <HeroVideo />}*/