import { useState } from "react";
import Nagivator from "../../Components/Nagivator";
import ShopGiff from "../../Components/ShopGif";
import Tickets from "../../Components/Tickets";
import Movies from "../../Components/Movies";
function HomePage() {
  const [active, setActive] = useState("SHOP QUÀ TẶNG"); // mặc định hiển thị Shop

  return (
    <div>
      <section className="flex items-center justify-center text-2xl p-6">
        <a href="/"> LOGO CINEMA</a>
      </section>
      <hr />
      <Nagivator active={active} setActive={setActive} />
      <hr />
      {/* Điều kiện hiển thị */}
      {active === "SHOP QUÀ TẶNG" && <ShopGiff />}
      {active === "MUA VÉ" && <Tickets />}
      {active === "PHIM" && <Movies/>}
      {active === "RẠP CHIẾU PHIM" && (
        <div className="p-6 text-center">Thông tin rạp chiếu...</div>
      )}
      {active === "TIN MỚI VÀ ƯU ĐÃI" && (
        <div className="p-6 text-center">Tin tức & Ưu đãi...</div>
      )}
      {active === "LIÊN HỆ" && (
        <div className="p-6 text-center">Liên hệ chúng tôi...</div>
      )}
    </div>
  );
}

export default HomePage;
