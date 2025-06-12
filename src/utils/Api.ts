import axios, { AxiosRequestHeaders } from "axios";

const IP_ADDRESS_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!IP_ADDRESS_BACKEND) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL is not defined in environment variables"
  );
}

interface ApiCallParams<T = unknown> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: T;
  headers?: AxiosRequestHeaders;
  credentials?: boolean;
}

const apiCall = async <TResponse, TRequest = Record<string, unknown>>({
  method,
  url,
  data,
  headers,
  credentials = true,
}: ApiCallParams<TRequest>): Promise<TResponse> => {
  try {
    const response = await axios({
      method,
      url: `${IP_ADDRESS_BACKEND}${url}`,
      data,
      withCredentials: credentials,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data as TResponse;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const apiUtility = {
  loginUser: (body: { email: string; password: string; role: string }) =>
    apiCall<
      {
        message: string;
        user: {
          id: string;
          name: string;
          email: string;
          role: string;
        };
        accessToken: string;
      },
      { email: string; password: string; role: string }
    >({
      method: "POST",
      url: "/user/login",
      data: body,
    }),

  registerUser: (body: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) =>
    apiCall<
      { user: { id: string; name: string; email: string; role: string } },
      { name: string; email: string; password: string; role: string }
    >({
      method: "POST",
      url: "/user/register",
      data: body,
    }),

  sendResetOtp: (body: { email: string }) =>
    apiCall<{ message: string }, { email: string }>({
      method: "POST",
      url: "/user/forgot-password",
      data: body,
    }),

  verifyResetOtp: (body: { email: string; otp: string }) =>
    apiCall<{ valid: boolean }, { email: string; otp: string }>({
      method: "POST",
      url: "/user/verify-otp",
      data: body,
    }),

  resetPassword: (body: { email: string; otp: string; password: string }) =>
    apiCall<
      { message: string },
      { email: string; otp: string; password: string }
    >({
      method: "POST",
      url: "/user/reset-password",
      data: body,
    }),

    
  searchMentors: (params?: {
    skills?: string[];
    tags?: string[];
    minExperience?: number;
    available?: boolean;
    rating?: number;
    name?: string;
  }) => {
    // Convert arrays to comma-separated strings and build query params
    const queryParams = new URLSearchParams();

    if (params?.skills?.length) {
      queryParams.append("skills", params.skills.join(","));
    }

    if (params?.tags?.length) {
      queryParams.append("tags", params.tags.join(","));
    }

    if (params?.minExperience) {
      queryParams.append("minExperience", params.minExperience.toString());
    }

    if (params?.available !== undefined) {
      queryParams.append("available", params.available.toString());
    }

    if (params?.rating) {
      queryParams.append("rating", params.rating.toString());
    }

    if (params?.name) {
      queryParams.append("name", params.name);
    }

    const queryString = queryParams.toString();

    return apiCall<{
      mentors: Array<{
        id: string;
        experience: number;
        rating: number;
        availability: boolean;
        skills: string[];
        tags: string[];
        user: {
          name: string;
        };
      }>;
    }>({
      method: "GET",
      url: `/mentor/search-mentors${queryString ? `?${queryString}` : ""}`,
    });
  },
};
