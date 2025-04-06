import { cookies } from "next/headers";
import React from "react";
import { apiRequest } from "@/lib/http";
import Image from "next/image";
import { Calendar, Mail, MapPin, Settings, UserPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AccountRes, AccountResType } from "@/schemaValidations/account.schema";

const MeProfile = async () => {
  const cookieStore = cookies(); // chỉ hoạt động ở server-side
  const sessionToken = cookieStore.get("sessionToken");

  let data: AccountResType = {
    message: "",
    data: { id: 0, name: "", email: "" },
  };

  try {
    const rawData = await apiRequest("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    });

    data = AccountRes.parse(rawData);
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex items-start mt-8 p-12 space-x-8">
      <div className="relative group ">
        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-[#194559]">
          <Image
            alt="avatar"
            src="/images/cyber.jpg"
            priority
            quality={100}
            width={128}
            height={128}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <Link href="/me/edit">
          <button className="absolute bottom-2 right-2 w-8 h-8 bg-[#047e92] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <UserPen />
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">Username: {data?.data?.name}</h1>
        <p className="text-sm text-slate-400 mt-1">@Algorithms</p>
        <p className="text-slate-300 max-w-2xl text-base mt-6 mb-6">
          Product designer and developer. Creating digital experiences that
          blend aesthetics with functionality. Always exploring new technologies
          and design patterns.
        </p>

        <div className="flex items-center gap-6 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sm" />
            <p className="text-sm">San Francisco, CA</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-sm" />
            <p className="text-sm">{data?.data?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sm" />
            <p className="text-sm">Joined April 2022</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="flex flex-col justify-center items-center">
            <h4>42</h4>
            <p className="text-slate-400 text-sm font-light">Products</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h4>1248</h4>
            <p className="text-slate-400 text-sm font-light">Followers</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h4>567</h4>
            <p className="text-slate-400 text-sm font-light">Following</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <Button
          className="transition-all duration-300 hover:scale-110"
          variant={"secondary"}
        >
          Follow
        </Button>
        <Button
          className="transition-all duration-300 hover:scale-110"
          variant={"outline"}
        >
          Message
        </Button>
        <Button
          className="transition-all duration-300 hover:scale-110"
          variant={"ghost"}
        >
          <Settings className="w-4 h-4 text-slate-400" />
        </Button>
      </div>
    </div>
  );
};

export default MeProfile;
