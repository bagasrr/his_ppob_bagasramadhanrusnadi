import React, { useRef } from "react";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  profileImageUrl: string;
  onImageSelect: (file: File) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profileImageUrl, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };
  console.log(profileImageUrl);

  return (
    <div className="relative w-32 h-32 mx-auto cursor-pointer group" onClick={handleAvatarClick}>
      <img src={profileImageUrl || "/Website Assets/Profile Photo.png"} alt="Profile" className="w-40  rounded-full mb-2 border-2 border-gray-200" />

      <div className="absolute inset-0 bg-slate/90 bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-opacity duration-300">
        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
    </div>
  );
};

export default ProfileAvatar;
