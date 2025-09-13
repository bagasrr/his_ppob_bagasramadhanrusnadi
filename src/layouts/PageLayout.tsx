import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";

interface PageLayoutProps {
  children: React.ReactNode;
  pageTitle: string | null;
}
const PageLayout: React.FC<PageLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div>
      <PageTitle title={pageTitle} />
      <Navbar />
      <div className="container mx-auto px-4 py-8">{children}</div>;
    </div>
  );
};

export default PageLayout;
