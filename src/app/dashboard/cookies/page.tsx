import React from "react";
import { TabBar } from "@/components";
import { cookies } from "next/headers";


export const metadata = {
  title: 'Cookies Page',
  description: 'SEO Title',
};

export default function CookiesPage() {

  const cookieStore = cookies();
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={ +cookieTab }/>
      </div>
    </div>
  );
}