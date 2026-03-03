import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
