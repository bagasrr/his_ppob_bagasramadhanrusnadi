import { Link } from "react-router-dom";

interface ServiceIconProps {
  iconUrl: string;
  serviceName: string;
  serviceCode: string;
  onClick?: () => void;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ iconUrl, serviceName, serviceCode, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center cursor-pointer group" onClick={onClick}>
      <Link to={`transaction/${serviceCode}`} className="w-12 h-12 mb-2 flex items-center justify-center">
        <img src={iconUrl} alt={serviceName} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
      </Link>
      <p className="text-xs text-gray-600 font-medium group-hover:text-red-600">{serviceName}</p>
    </div>
  );
};

export default ServiceIcon;
