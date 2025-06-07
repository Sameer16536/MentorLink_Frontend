import axios, { AxiosRequestHeaders } from "axios";


const IP_ADDRESS_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!IP_ADDRESS_BACKEND) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in environment variables");
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
      { token: string },
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
};
