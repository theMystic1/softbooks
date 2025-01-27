import { Config } from "@/tsconfig/envconfig";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// import  { } from
const {
  IkImage: { publicKey, privateKey, endpoint },
} = Config;
const options = {
  publicKey,
  privateKey,
  urlEndpoint: endpoint,
};
const imageKit = new ImageKit(options);

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
