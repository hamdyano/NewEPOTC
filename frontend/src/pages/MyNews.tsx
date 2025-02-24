import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNews, deleteNews, fetchNews, updateNews } from '@/api-client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';

const MyNews = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await fetchNews();
      setNews(response.news);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('error.fetchNews'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await createNews(formData);
      await loadNews();
      setIsCreateDialogOpen(false);
      toast.success(t('success.newsCreated'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('error.createNews'));
    }
  };

  const handleDelete = async (newsId: string) => {
    if (window.confirm(t('confirm.deleteNews'))) {
      try {
        await deleteNews(newsId);
        setNews(news.filter(item => item._id !== newsId));
        toast.success(t('success.newsDeleted'));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t('error.deleteNews'));
      }
    }
  };

  const handleUpdate = async (newsId: string, formData: FormData) => {
    try {
      await updateNews(newsId, formData);
      await loadNews();
      setIsEditDialogOpen(false);
      toast.success(t('success.newsUpdated'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('error.updateNews'));
    }
  };

  const CreateNewsDialog = () => {
    const [titles, setTitles] = useState({ en: '', ar: '', fr: '' });
    const [paragraphs, setParagraphs] = useState({ en: '', ar: '', fr: '' });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [activeLang, setActiveLang] = useState(i18n.language);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);

      if (!titles.en || !paragraphs.en || !selectedImage) {
        setFormError(t('error.requiredFields'));
        return;
      }

      const formData = new FormData();
      formData.append('title', JSON.stringify(titles));
      formData.append('paragraph', JSON.stringify(paragraphs));
      formData.append('image', selectedImage);

      await handleCreate(formData);
    };

    return (
      <DialogContent>
        <DialogTitle>{t('createArticle')}</DialogTitle>
        <div className="flex gap-2 mb-4">
          {['en', 'ar', 'fr'].map((lang) => (
            <Button
              key={lang}
              variant={activeLang === lang ? 'default' : 'outline'}
              onClick={() => setActiveLang(lang)}
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={titles[activeLang as keyof typeof titles]}
              onChange={(e) => setTitles({ ...titles, [activeLang as keyof typeof titles]: e.target.value })}
              placeholder={t('title')}
              className="w-full"
            />
          </div>
          <div>
            <textarea
              value={paragraphs[activeLang as keyof typeof paragraphs]}
              onChange={(e) => setParagraphs({ ...paragraphs, [activeLang as keyof typeof paragraphs]: e.target.value })}
              placeholder={t('content')}
              className="w-full min-h-[100px] p-2 border rounded-md"
              rows={4}
            />
          </div>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <Button type="submit" className="w-full">
            {t('createArticle')}
          </Button>
        </form>
      </DialogContent>
    );
  };

  const EditDialog = ({ newsItem }: { newsItem: NewsItem }) => {
    const [titles, setTitles] = useState(newsItem.title);
    const [paragraphs, setParagraphs] = useState(newsItem.paragraph);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [activeLang, setActiveLang] = useState(i18n.language);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', JSON.stringify(titles));
      formData.append('paragraph', JSON.stringify(paragraphs));
      if (selectedImage) formData.append('image', selectedImage);
      await handleUpdate(newsItem._id, formData);
    };

    return (
      <DialogContent>
        <DialogTitle>{t('editArticle')}</DialogTitle>
        <div className="flex gap-2 mb-4">
          {['en', 'ar', 'fr'].map((lang) => (
            <Button
              key={lang}
              variant={activeLang === lang ? 'default' : 'outline'}
              onClick={() => setActiveLang(lang)}
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={titles[activeLang as keyof typeof titles]}
              onChange={(e) => setTitles({ ...titles, [activeLang as keyof typeof titles]: e.target.value })}
              placeholder={t('title')}
              className="w-full"
            />
          </div>
          <div>
            <textarea
             value={paragraphs[activeLang as keyof typeof paragraphs]}
             onChange={(e) => setParagraphs({ ...paragraphs, [activeLang as keyof typeof paragraphs]: e.target.value })}
              placeholder={t('content')}
              className="w-full min-h-[100px] p-2 border rounded-md"
              rows={4}
            />
          </div>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('saveChanges')}
          </Button>
        </form>
      </DialogContent>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('My Articles')}</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('createNews')}
            </Button>
          </DialogTrigger>
          <CreateNewsDialog />
        </Dialog>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-600">{t('noArticles')}</h2>
          <p className="text-gray-500 mt-2">{t('startCreating')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.title[i18n.language as keyof typeof item.title]}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <h2 className="text-xl font-semibold line-clamp-2">
                  {item.title[i18n.language as keyof typeof item.title]}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">
                  {item.paragraph[i18n.language as keyof typeof item.paragraph]}
                </p>
              </CardContent>
              <CardFooter className="gap-2 justify-end">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingNews(item)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      {t('Edit')}
                    </Button>
                  </DialogTrigger>
                  {editingNews && editingNews._id === item._id && (
                    <EditDialog newsItem={editingNews} />
                  )}
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('Delete')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNews;

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
  email: string;
}












