import React from "react";

interface Service {
  name: string;
  price: string;
  description: string;
}

interface ServicesBlockProps {
  content: {
    heading: string;
    services: Service[];
  };
}

export const ServicesBlock = ({ content }: ServicesBlockProps) => {
  if (!content || !content.services) {
    return null;
  }

  return (
    <section className="py-24 px-6 bg-black/50 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{content.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
              <p className="text-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};