import Header from "./components/Layout/header";
import "./css/App.css";
import Footer from "./components/Layout/footer";
import MainImgCard from "./components/Mainhome/ImgCard";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <MainImgCard />
      <Footer />
    </div>
  );
}
