interface LoadingModalBoxProps {
  children: React.ReactNode;
}

const LoadingModalBox: React.FC<LoadingModalBoxProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <img src="/Website Assets/Logo.png" alt="Logo" />
        <p className="text-lg text-gray-700">{children}</p>
      </div>
    </div>
  );
};

export default LoadingModalBox;
