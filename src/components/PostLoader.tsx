import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const PostLoader: React.FC = () => {
  return <SkeletonPlaceholder borderRadius={4}>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" padding={12}>
      <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
      <SkeletonPlaceholder.Item marginLeft={12}>
        <SkeletonPlaceholder.Item width={120} height={16} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>

    <SkeletonPlaceholder.Item paddingHorizontal={12}>
      <SkeletonPlaceholder.Item width="100%" height={200} borderRadius={8} />
      <SkeletonPlaceholder.Item marginTop={12} width="90%" height={16} />
      <SkeletonPlaceholder.Item marginTop={8} width="60%" height={16} />
    </SkeletonPlaceholder.Item>

    <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="space-between"
      padding={12}
      marginTop={12}
    >
      <SkeletonPlaceholder.Item flexDirection='row' gap={10}>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
}

export default PostLoader