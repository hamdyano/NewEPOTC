import React, { useState, ReactNode, useEffect } from "react";
import Training100 from "../assets/Training100.jpg";
import trainings from "../assets/trainings.jpg";
import trainingWithFlag from "../assets/trainingWithFlag.jpg";
import { useTranslation } from "react-i18next";
import { fetchFeaturedNews } from "@/api-client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import i18n from "@/i18n";

interface NewsItem {
  _id: string;
  title: {
    en: string;
    ar: string;
    fr: string;
  };
  paragraph: {
    en: string;
    ar: string;
    fr: string;
  };
  image: string | null;
  youtubeLink: string | null;
  isFeatured?: boolean; // Add this new field
  email: string;
  createdAt: string;
}

// Updated SeeMoreText with TypeScript Props
interface SeeMoreTextProps {
  children: string | ReactNode;
  maxLength?: number;
}

const SeeMoreText: React.FC<SeeMoreTextProps> = ({
  children,
  maxLength = 300,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert children to string for length checking
  const textContent =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join("");

  // If text is shorter than maxLength, show full text
  if (textContent.length <= maxLength) {
    return (
      <p className="text-[#264e7c] text-1xl tracking-tighter font-['Roboto']">
        {children}
      </p>
    );
  }

  return (
    <div>
      <p className="text-[#264e7c] text-1xl tracking-tighter font-['Roboto']">
        {isExpanded ? children : `${textContent.slice(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#cf6439] font-bold mt-2 hover:underline"
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/
    );
    return match && match[1].length === 11 ? match[1] : null;
  };

  const getLocalizedContent = (content: {
    en: string;
    ar: string;
    fr: string;
  }) => {
    const lang = i18n.language as keyof typeof content;
    return content[lang] || content.en;
  };

  // Add useEffect for fetching featured news
  useEffect(() => {
    const loadFeaturedNews = async () => {
      try {
        const response = await fetchFeaturedNews();
        setFeaturedNews(response.news);
      } catch (err) {
        console.error("Error loading featured news:", err);
      }
    };
    loadFeaturedNews();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-[#133355] rounded-2xl shadow-md py-12 flex flex-col gap-5 text-center -mt-24 ">
        <h1 className="text-4xl font-bold tracking-tight text-white font-['Roboto']">
          {t("homepage.title")}
        </h1>
        <span className="text-white text-xl font-['Roboto']">
          {t("homepage.subtitle")}
        </span>
      </div>

      {/*Featured News*/}

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[#264e7c] mb-8 text-center font-['Roboto']">
          {t("Latest News")}
        </h2>

        <div className="flex justify-center">
          <div className="w-20 border-b-2 border-[#cf6439] my-2 mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {featuredNews.map((item) => {
            const youtubeId = getYouTubeId(item.youtubeLink);
            const localizedTitle = getLocalizedContent(item.title);
            const localizedParagraph = getLocalizedContent(item.paragraph);

            return (
              //news added by admin

              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative "
              >
                {/* Media Section */}
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      className="w-full h-full"
                      allowFullScreen
                      title={localizedTitle}
                    />
                  ) : (
                    item.image && (
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={localizedTitle}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#264e7c] line-clamp-2 mb-2 font-['Roboto']">
                    {localizedTitle}
                  </h3>
                  <p className="text-[#264e7c] text-sm line-clamp-3 mb-4 font-['Roboto']">
                    {localizedParagraph}
                  </p>
                  <Button
                    variant="link"
                    className="text-[#cf6439] font-bold p-0 hover:underline"
                    onClick={() => navigate(`/details/${item._id}`)}
                  >
                    {t("Read More")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-4xl tracking-tighter font-['Roboto']">
            {t(
              "What is The Egyptian Peacekeeping Operations Training Center ?"
            )}
          </h2>
          <div className="w-24 border-b-2 border-[#cf6439]"></div>
          <p className="text-[#264e7c] text-1xl tracking-tighter font-['Roboto']">
            {t(
              "Egypt is keen on enhancing a sustained approach to maintain global peace and security, promoting peace and addressing the scourge of wars, armed conflicts, violence and terrorism. The Ministry of Interior established the Egyptian Peacekeeping Operations Training Center (EPOTC) in Police Academy to qualify Police personnel for effective contribution in peacekeeping and peacebuilding in conflict zones as an approach towards the global humanitarian role of peacekeepers"
            )}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-3/5">
          <img
            src={trainingWithFlag}
            alt="Description"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-4xl tracking-tighter font-['Roboto']">
            {t("Mission")}
          </h2>
          <div className="w-24 border-b-2 border-[#cf6439] my-2"></div>
          <SeeMoreText>
            {t(
              "To conduct training, studies, research and specialized programs for peacekeepers in all aspects of peacekeeping operations in order to improve the effectiveness of their contributions and cope with the evolving field requirements."
            )}
          </SeeMoreText>
        </div>

        <div className="w-full md:w-3/5 relative">
          <div
            id="loading-spinner"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          >
            <div className="loader"></div>
          </div>

          <iframe
            src="https://www.youtube-nocookie.com/embed/7hOUqjTCV90"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover aspect-video"
            onLoad={() => {
              const spinner = document.getElementById("loading-spinner");
              if (spinner) spinner.style.display = "none";
            }}
          ></iframe>
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row items-center">
        <div className="w-full md:w-4/5 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-4xl tracking-tighter font-['Roboto']">
            {t("Task")}
          </h2>
          <div className="w-24 border-b-2 border-[#cf6439]"></div>
          <SeeMoreText>
            {t(
              "The center carries out the following missions : Preparing and training national and international cadres to work in peacekeeping missions and providing full support to both male and female participants interested in joining. Organizing various activities (training courses, seminars, conferences, workshops, etc.) in coordination with national entities, friendly countries, and organizations (international and regional) to enhance the role of police components in peacekeeping operations. Conducting studies and research related to all aspects of UN mission operations, reviewing the challenges faced by participants, and exploring ways to overcome them. Collaborating in training and exchanging expertise with similar entities (internationally, regionally, and locally) to enhance the performance of UN personnel."
            )}
          </SeeMoreText>
        </div>

        <div className="w-full md:w-3/5">
          <img
            src={Training100}
            alt="Our Task"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-cover bg-center hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-4/5 flex flex-col justify-center gap-4 p-6 text-center md:text-left">
          <h2 className="text-[#264e7c] font-bold text-4xl tracking-tighter font-['Roboto']">
            {t("Training Topics")}
          </h2>
          <div className="w-24 border-b-2 border-[#cf6439]"></div>
          <SeeMoreText maxLength={400}>
            {t(
              "EPOTC conducts peacekeeping training, studies and research, as follows: • Qualifying police personnel for participating in Peacekeeping operations. • Protection of Civilians in armed conflicts. • Disarmament, Demobilization and Reintegration (DDR) of (ex-combatants/fighters) at mission host countries. • Capacity building of local police at mission host countries. • Political and ethnic conflict analysis and mediation. • Preventing radicalization and extremism leading to terrorism. • Monitoring elections at mission host countries. • Correctional institutions reform and security. • Countering illegal immigration, human trafficking, and transnational organized crime. • Qualifying female personnel for participating in Peacekeeping operations. • Improvised Explosive Devices (IEDs) detection. • First aid in police operations."
            )}
          </SeeMoreText>
        </div>

        <div className="w-full md:w-3/5">
          <img
            src={trainings}
            alt="Training Topics"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
