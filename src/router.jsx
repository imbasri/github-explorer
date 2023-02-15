import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/error/Error";
const router = createBrowserRouter([
   {
      path: `*`,
      element: <ErrorPage />,
   },
   {
      path: `/`,
      element: <App />,
   },
   {
      path: `/search/*`,
      element: <App />,
   },
]);
export default router;
