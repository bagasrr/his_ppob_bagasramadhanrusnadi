import React from "react";
import { Helmet } from "react-helmet";

interface PageTitleProps {
  title: string | null;
}

const APP_NAME = "Web SIMS PPOB - Bagas Ramadhan Rusnadi";

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  // Jika judul diberikan, formatnya "Judul Halaman | Nama Aplikasi"
  // Jika tidak, hanya tampilkan nama aplikasi
  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default PageTitle;
