"use client";

import { FileChange, InputProps } from "@/tsconfig/types";
import { usePathname, useRouter } from "next/navigation";
import SubmitBtn from "../ui/submit-btn";
import Link from "next/link";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { Config } from "@/tsconfig/envconfig";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { signInWithCredentials, signup } from "@/app/lib/action";

function FormClient() {
  const pathname = usePathname();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idNumber: 0,
    profileImage: "",
    password: "",
  });

  const isLogin = pathname === "/login";
  const headerText = isLogin
    ? "Welcome Back to the BookWise"
    : "Create Your softbooks account";
  const detatilsText = isLogin
    ? "Access the vast collection of resources, and stay updated"
    : "Please complete all fields and upload a valid ID to gain access to the library";

  const submitBtnText = isLogin ? "Login" : "Sign up";

  async function handleSubmit(e: any) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const result: any = isLogin
        ? await signInWithCredentials({ email, password })
        : await signup(formData);

      if (result.success) {
        toast({
          title: isLogin ? "Sign in successful" : "Sign up successful",
          description: result?.message,
        });

        router.push("/");
      } else {
        toast({
          title: isLogin ? "Sign in error" : "Sign up error",
          description: result?.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className="p-3 flex flex-col gap-6">
      <h1 className="text-2xl font-bold capitalize">{headerText}</h1>
      <p className="text-sm">{detatilsText}</p>

      <div className=" flex flex-col gap-6">
        {isLogin ? null : (
          <Input
            label="Full name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            type="text"
          />
        )}
        <Input
          label="Email"
          placeholder={isLogin ? "Enter Email" : "Enter a valid email"}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          type="email"
        />

        {isLogin ? null : (
          <Input
            label="ID Number"
            placeholder="Enter Your identity number"
            // @ts-ignore
            defaultValue={formData.idNumber}
            onChange={(e) => {
              setFormData({ ...formData, idNumber: +e.target.value });
            }}
            type="number"
          />
        )}

        <Input
          label="Password"
          placeholder={
            isLogin ? "Enter your password" : "Enter a strong password"
          }
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          type="password"
        />
        {/* <Input
          label="Email"
          placeholder="Enter a valid email"
          value=""
          onChange={(e) => {}}
          type="email"
        /> */}
        <span className="w-full flex flex-col gap-2">
          <label htmlFor="ID" className="text-light-100">
            Upload a valid ID
          </label>

          {isLogin ? null : (
            <ImageUpload
              onFileChange={(file) => {
                setFormData({ ...formData, profileImage: file });
              }}
            />
          )}
        </span>

        <SubmitBtn text={submitBtnText} onClick={handleSubmit} />
      </div>

      <span className="flex items-center justify-center gap-3 mt-6">
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <Link
          href={isLogin ? "/register" : "/login"}
          className="text-light-200"
        >
          {isLogin ? "Register" : "Login"}
        </Link>
      </span>
    </div>
  );
}

export default FormClient;

function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  defaultValue,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const icon = showPassword ? "/icons/admin/close.svg" : "/icons/admin/eye.svg";
  const inputType = label === "Password" && showPassword ? "text" : type;

  return (
    <span className="w-full flex flex-col relative gap-2">
      <label htmlFor={label} className="text-light-100">
        {label}
      </label>
      <input
        type={inputType}
        className="form-input placeholder:px-2 placeholder:text-light-100 px-4 rounded-md"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        defaultValue={defaultValue ? defaultValue : ""}
      />
      {label === "Password" ? (
        <button
          className="absolute right-6 top-12"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((pd) => !pd);
          }}
        >
          <Image src={icon} width={20} height={20} alt="eye" />
        </button>
      ) : null}
    </span>
  );
}
function ImageUpload({ onFileChange }: FileChange) {
  const {
    IkImage: { publicKey, endpoint },
  } = Config;

  const ikRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  async function authenticator() {
    try {
      const res = await fetch(`${Config.apiEndPoint}/api/auth/imagekit`);

      if (!res?.ok) {
        const errorText = await res.text();
        throw new Error(
          `Request failed  with status ${res.status}: ${errorText}`
        );
      }

      const data = await res.json();

      const { signature, expire, token } = data;

      return {
        token,
        expire,
        signature,
      };
    } catch (error: any) {
      console.error(error?.message);
      throw new Error("Failed to authenticate");
    }
  }

  const onError = (error: any) => {
    toast({
      title: "Image uploaded failed",
      description: `Your Image upload failed kindly try again`,
      variant: "destructive",
    });
    console.error("Failed to upload image", error);
    // Handle error here
    // throw new Error("Failed to upload image");
  };

  const onSuccess = (res: any) => {
    const { filePath } = res;
    setFile(res);
    onFileChange(filePath);

    toast({
      title: "Image uploaded successfully",
      description: `${filePath} uploaded successfully`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={endpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <div className="flex flex-col gap-4">
        <button
          className="upload-btn"
          onClick={(e) => {
            e.preventDefault();
            if (ikRef.current) {
              // @ts-ignore
              ikRef.current?.click();
            }
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="Upload icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="text-base text-light-100">Uploa a file</p>
          {file && <span className="upload-filename">{file.filePath}</span>}
        </button>

        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            height={300}
            width={500}
          />
        )}
      </div>
    </ImageKitProvider>
  );
}
