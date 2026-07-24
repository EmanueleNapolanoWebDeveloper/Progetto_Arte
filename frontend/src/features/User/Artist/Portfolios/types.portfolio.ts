export type PresignedUrlResponse = {
  urls: {
    originalFileName: string;
    uploadUrl: string;
    fileKey: string;
  }[];
};

export type ConfirmPortfolioResponse = {
  message: string;
  data: unknown[];
};
