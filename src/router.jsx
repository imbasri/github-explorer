import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./components/error/Error";

const router = createBrowserRouter([
   {
      path: "/search/*",
      element: <App />,
   },
   {
      path: "*",
      element: <Error />,
   },
]);
export default router;
