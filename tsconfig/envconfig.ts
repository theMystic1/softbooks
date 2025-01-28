export const Config = {
  apiEndPoint: process.env.NEXT_PUBLIC_BASE_URL!,
  prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
  IkImage: {
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    endpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  },
  databaseurl: process.env.DATABASE_URL!,
  upstash: {
    redisUrl: process.env.UPSTASH_REDIS_URL!,
    redistToken: process.env.UPSTASH_REDIS_TOKEN!,
    qstashUrl: process.env.QSTASH_URL!,
    qstashToken: process.env.QSTASH_TOKEN!,
  },

  resendToken: process.env.RESEND_TOKEN!,
};
