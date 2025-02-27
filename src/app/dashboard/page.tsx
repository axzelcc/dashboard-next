import { authOptions } from "@/auth";
import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  if ( !session ) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
       <WidgetItem title="Usuario conectado S-Side">
          <div className="flex flex-col">
            <span>{  JSON.stringify( session.user?.name  )  }</span>
            <span>{  JSON.stringify( session.user?.image )  }</span>
            <span>{  JSON.stringify( session.user?.email )  }</span>            
          </div>
       </WidgetItem>
    </div>  
  );
}