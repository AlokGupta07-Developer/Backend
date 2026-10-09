import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <div>
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
