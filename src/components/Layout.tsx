import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
