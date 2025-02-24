import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNewsById } from '@/api-client';

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
  image: string;
}

const Details = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNewsById(id!);
        setNews(newsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('error.fetchNews'));
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id, t]);

  const getLocalizedContent = (content: { en: string; ar: string; fr: string }) => {
    const lang = i18n.language as keyof typeof content;
    return content[lang] || content.en;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-600">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-600">{t('newsNotFound')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <img
            src={`data:image/jpeg;base64,${news.image}`}
            alt={getLocalizedContent(news.title)}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-[#234d7e]">
          {getLocalizedContent(news.title)}
        </h1>
        <div className="w-24 border-b-2 border-[#cf6439] mb-8"></div>
        
        <p className="text-[#234d7e] text-lg leading-relaxed">
          {getLocalizedContent(news.paragraph)}
        </p>
      </div>
    </div>
  );
};

export default Details;




