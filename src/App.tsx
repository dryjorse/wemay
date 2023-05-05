import { Routes, Route } from "react-router-dom";
import { router } from "./router/router";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {router.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
