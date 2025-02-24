import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Updated NewsItem interface with multilingual support
export interface NewsItem {
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
  createdAt: string;
}

// =============================================
//               AUTHENTICATION
// =============================================

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

export const validateToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
       headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      console.error("Response status:", response.status);
      throw new Error("Token invalid");
    }

    const { userId, email } = await response.json();
    return { userId, email };
  } catch (error) {
    console.error("Error validating token:", error);
    throw error;
  }
  
};



export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) throw new Error("Error during sign out");
};

// =============================================
//               USER PROFILE
// =============================================

export const fetchProfileData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user-profile/profile`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};

export const updateProfile = async (updateData: {
  firstName?: string;
  lastName?: string;
  city?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/user-update/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};


// =============================================
//               NEWS MANAGEMENT
// =============================================
// Create News with multilingual support
export const createNews = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/news/adding-news`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to create news");
  }
  return responseBody;
};

// Fetch All News (public route)
export const fetchNews = async (): Promise<{ news: NewsItem[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch news");
  }
  return responseBody;
};


// Fetch News Created by Authenticated User
export const fetchMyNews = async (): Promise<{ news: NewsItem[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/news/my-news`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch news");
  }
  return responseBody;
};


//Fetch Single News Article by ID
export const fetchNewsById = async (newsId: string): Promise<NewsItem> => {
  const response = await fetch(`${API_BASE_URL}/api/news/${newsId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return responseBody.news;
};

// Update News with multilingual support
export const updateNews = async (newsId: string, formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/news/update-news/${newsId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to update news");
  }
  return responseBody;
}; 



// Delete News
export const deleteNews = async (newsId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/news/delete-news/${newsId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete news");
  }
  return { message: "News deleted successfully" };
};

// =============================================
//             PARTNERSHIP MANAGEMENT
// =============================================

export const createPartner = async (partnerData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/partner/add-partner`, {
    method: "POST",
    credentials: "include",
    body: partnerData,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to create partnership");
  }
  return responseBody;
};

export const fetchPartnerships = async () => {
  const response = await fetch(`${API_BASE_URL}/api/partner`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch partnerships");
  }
  return responseBody.partnerships;
};

export const fetchMyPartners = async () => {
  const response = await fetch(`${API_BASE_URL}/api/partner/my-partners`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch partners");
  }
  return responseBody.partners;
};

export const updatePartner = async (partnerId: string, formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/partner/update-partner/${partnerId}`,
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to update partner");
  }
  return responseBody;
};

export const deletePartner = async (partnerId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/partner/delete-partner/${partnerId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed to delete partner");
  return { message: "Partner deleted successfully" };
};

export const fetchPartnerById = async (partnerId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/partner/${partnerId}`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch partner");
  }
  return responseBody.partner;
};


// =============================================
//               PHOTO MANAGEMENT
// =============================================

export const createPhoto = async (photoData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/allphotos/add-photo`, {
    method: "POST",
    credentials: "include",
    body: photoData,
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to upload photo");
  return responseBody;
};

export const fetchAllPhotos = async () => {
  const response = await fetch(`${API_BASE_URL}/api/allphotos`);
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch photos");
  return responseBody.photos;
};

export const fetchMyPhotos = async () => {
  const response = await fetch(`${API_BASE_URL}/api/allphotos/my-photos`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch your photos");
  return responseBody.photos;
};

export const updatePhoto = async (photoId: string, formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/allphotos/update-photo/${photoId}`,
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    }
  );
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update photo");
  return responseBody;
};

export const deletePhoto = async (photoId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/allphotos/delete-photo/${photoId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed to delete photo");
  return { message: "Photo deleted successfully" };
};

export const fetchPhotoById = async (photoId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/allphotos/${photoId}`);
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch photo");
  return responseBody.photo;
};





































