import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props:any) => (
    <ContentLoader 
    speed={2}
    width={576}
    height={466}
    viewBox="0 0 576 466"
    backgroundColor="#f0f0f0"
    foregroundColor="#d9d9d9"
    {...props}
  >
    <rect x="102" y="26" rx="10" ry="10" width="448" height="51" /> 
    <rect x="105" y="92" rx="10" ry="10" width="446" height="217" /> 
    <rect x="106" y="331" rx="10" ry="10" width="448" height="30" /> 
    <circle cx="53" cy="53" r="26" />
  </ContentLoader>
)

export default MyLoader