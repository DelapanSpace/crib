import { client } from "@/sanity/lib/client";
import { servicePageQuery } from "@/sanity/queries/servicePage";
import { ServiceFlow } from "../components/service-flow";

// Optional: Force dynamic if you need real-time updates without building
// export const dynamic = 'force-dynamic';

export default async function ServiceView() {
  // Fetch data from Sanity
  const data = await client.fetch(servicePageQuery);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main className="w-full h-full">
        {/* Pass fetched data to the client component */}
        <ServiceFlow data={data} />
      </main>
    </div>
  );
}
