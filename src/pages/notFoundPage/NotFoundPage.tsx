import React, { useEffect } from "react";

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <h2 style={{ textAlign: "center" }}>Страница не найдена</h2>;
};

export default NotFoundPage;
