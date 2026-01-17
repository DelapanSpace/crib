import { ServiceFlow } from "../components/service-flow";

export default function ServiceView() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 2. The Node Canvas */}
      <main className="w-full h-full">
        <ServiceFlow />
      </main>
    </div>
  );
}