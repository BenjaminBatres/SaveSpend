import React from "react";

export default function SkeletonBox({ width, height, marginBottom, marginLeft, borderRadius, marginTop }) {
  return <div className="skeleton-box" style={{ width, height, marginBottom, marginLeft, borderRadius, marginTop }}></div>;
}
