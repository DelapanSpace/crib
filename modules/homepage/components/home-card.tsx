import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ContentCardProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
}

export function HomeCard({ title, imageUrl, imageAlt }: ContentCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}