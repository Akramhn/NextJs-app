import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";

export default function HelloWorld() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <UserInfo />
      </main>
      <Footer />
    </div>
  );
}
