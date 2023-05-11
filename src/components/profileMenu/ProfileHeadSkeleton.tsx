import React from "react"
import ContentLoader from "react-content-loader"

const ProfileHeadSkeleton: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={174}
    height={98}
    viewBox="0 0 174 98"
    backgroundColor="#f3f3f3"
    foregroundColor="#e3e3e3"
  >
    <rect x="24" y="52" rx="7" ry="7" width="122" height="16" /> 
    <rect x="25" y="164" rx="7" ry="7" width="122" height="20" /> 
    <rect x="24" y="1" rx="50" ry="50" width="40" height="40" /> 
    <rect x="24" y="78" rx="7" ry="7" width="102" height="16" />
  </ContentLoader>
)

export default ProfileHeadSkeleton;