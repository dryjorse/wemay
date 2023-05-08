import MainPage from "../pages/mainPage/MainPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";

export const router = [
  {path: '*', element: <NotFoundPage />, id: 1},
  {path: '/', element: <MainPage />, id: 2}
]