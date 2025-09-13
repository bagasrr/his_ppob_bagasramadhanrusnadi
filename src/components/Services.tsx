import React from "react";
import ServiceIcon from "./ServiceIcon";

// Tipe untuk satu item layanan
interface ServiceItem {
  service_icon: string;
  service_name: string;
  service_code: string;
}

interface ServicesGridProps {
  services: ServiceItem[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-y-6 gap-x-4">
        {services.map((service) => (
          <ServiceIcon key={service.service_code} iconUrl={service.service_icon} serviceName={service.service_name} serviceCode={service.service_code} />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
