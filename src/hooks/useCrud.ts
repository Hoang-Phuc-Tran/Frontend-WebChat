// Import necessary dependencies and custom hook for Axios with interceptor.
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import { useState } from "react";

// Define the interface for the useCrud hook.
interface IuseCrud<T> {
  dataCRUD: T[]; // Data retrieved from CRUD operations.
  fetchData: () => Promise<void>; // Function to fetch data from an API.
  error: Error | null; // Error object to capture any request errors.
  isLoading: boolean; // Indicates whether data is currently being fetched.
}

// Define the useCrud hook that handles CRUD operations.
const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  // Create an Axios instance with an interceptor for JWT handling.
  const jwtAxios = useAxiosWithInterceptor();

  // State variables to manage data, errors, and loading status.
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data from the specified API endpoint.
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Make a GET request to the API and retrieve response data.
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data;

      // Update the data, clear any previous errors, and mark loading as complete.
      setDataCRUD(data);
      setError(null);
      setIsLoading(false);

      // Return the fetched data.
      return data;
    } catch (error: any) {
      // Handle request errors, e.g., capture and set a 400 Bad Request error.
      if (error.response && error.response.status === 400) {
        setError(new Error("400 Bad Request"));
      }

      // Mark loading as complete and rethrow the error.
      setIsLoading(false);
      throw error;
    }
  };

  // Return an object containing the fetchData function and state variables.
  return { fetchData, dataCRUD, error, isLoading };
};

// Export the useCrud hook as the default export.
export default useCrud;
