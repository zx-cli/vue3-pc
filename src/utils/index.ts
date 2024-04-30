// 引入本地图片
export function getImageUrl(url: string) {
  return new URL(url, import.meta.url).href;
}

export const isLoad = (url: string, noloadList: any[]) => {
  for (const i of noloadList) {
    if (url.startsWith(i)) {
      return false;
    }
  }
  return true;
};

export function extractComponentName(filePath: string): string | null {
  // 从路径中提取文件名（不包括扩展名）
  const fileName = filePath.split("/").pop()?.replace(".vue", "");
  // 如果文件名存在且不为空，则返回它作为组件名
  if (fileName) {
    return fileName;
  } else {
    return null;
  }
}
