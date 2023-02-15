import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./components/error/Error";

const router = createBrowserRouter([
   {
      path: "*",
      element: <Error />,
   },
   {
      path: "/search/*",
      element: <App />,
   },
]);
export default router;
