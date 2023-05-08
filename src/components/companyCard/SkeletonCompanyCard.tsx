import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCompanyCard: React.FC = () => (
  <ContentLoader
    speed={2}
    width={205}
    height={280}
    viewBox="0 0 205 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#e3e3e3"
  >
    <rect x="0" y="0" rx="24" ry="24" width="205" height="280" />
    <rect x="51" y="46" rx="0" ry="0" width="48" height="52" />
  </ContentLoader>
);

export default SkeletonCompanyCard;
