import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonStockCard: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={540}
    height={370}
    viewBox="0 0 540 370"
    backgroundColor="#f3f3f3"
    foregroundColor="#e3e3e3"
  >
    <rect x="0" y="0" rx="24" ry="24" width="540" height="260" /> 
    <rect x="0" y="283" rx="29" ry="29" width="420" height="48" /> 
    <rect x="0" y="348" rx="18" ry="18" width="113" height="24" /> 
    <rect x="132" y="348" rx="18" ry="18" width="113" height="24" />
  </ContentLoader>
)

export default SkeletonStockCard