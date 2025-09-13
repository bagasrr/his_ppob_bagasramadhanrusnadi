import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { profileSchema } from "../../zod/validation";
import type { Profile } from "../../type/details";
import { GetProfile } from "../../api/Details";
import { UpdateProfile, UpdateProfileImage } from "../../api/Account";
import PageLayout from "../../layouts/PageLayout";
import ProfileAvatar from "../../components/ProfileAvatar";
import InputField from "../../components/InputField";
import { Button } from "../../components/Button";
import LoadingModalBox from "../../components/LoadingModalBox";

type ProfileFormInputs = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    values: profile,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await GetProfile(token);
        setProfile(data);

        reset(data);
      } catch (error) {
        setLoading(false);
        console.error("Gagal memuat profil:", error);
        toast.error("Gagal memuat profil.");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [reset, token]);

  const onSaveSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    const updatePromise = UpdateProfile(token, data);
    toast.promise(updatePromise, {
      loading: "Menyimpan profil...",
      success: (res) => {
        setProfile((prev) => ({ ...prev, ...data }));
        setIsEditing(false);
        return res.message || "Profil berhasil diperbarui!";
      },
      error: (err) => err?.message || "Gagal memperbarui profil.",
    });
  };

  const handleImageSelect = (file: File) => {
    if (file.size > 100 * 1024) {
      toast.error("Ukuran gambar tidak boleh melebihi 100KB.");
      return;
    }
    const updateImagePromise = UpdateProfileImage(token, file);
    toast.promise(updateImagePromise, {
      loading: "Mengunggah foto...",
      success: (res) => {
        if (res.data) {
          setProfile(res.data);
          reset(res.data);
        }
        return "Foto profil berhasil diperbarui!";
      },
      error: "Gagal mengunggah foto.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Anda berhasil logout.");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset(profile);
  };

  if (loading) {
    return <LoadingModalBox children="Memuat data..." />;
  }

  return (
    <PageLayout pageTitle="Profile">
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <div className="flex flex-col items-center">
          <ProfileAvatar profileImageUrl={profile.profile_image} onImageSelect={handleImageSelect} />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{`${profile.first_name} ${profile.last_name}`}</h1>

          <form onSubmit={handleSubmit(onSaveSubmit)} className="w-full mt-10 space-y-5">
            <InputField label="Email" defaultValue={profile.email} isEditing={false} />

            <InputField label="Nama Depan" registration={register("first_name")} error={errors.first_name} isEditing={isEditing} />

            <InputField label="Nama Belakang" registration={register("last_name")} error={errors.last_name} isEditing={isEditing} />

            {isEditing ? (
              <div className="flex space-x-4 pt-4">
                <Button type="submit" variant={isDirty ? "primary" : "secondary"} isLoading={isSubmitting} disabled={!isDirty || isSubmitting}>
                  Simpan
                </Button>

                <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                  Batalkan
                </Button>
              </div>
            ) : (
              <div className="pt-4">
                <Button type="button" variant="secondary" className="mt-3" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </form>

          <div className="w-full pt-4 mt-2">
            <Button variant="outline" className="mt-3" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ProfilePage;
