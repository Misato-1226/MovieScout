import NowPlaying from "../components/Home/HomeComponents/NowPlaying";
import Title from "../components/Home/HomeComponents/Title";
import TopRated from "../components/Home/HomeComponents/TopRated";

const Home = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Title />

      <NowPlaying />
      <TopRated />
      <div className="text-center">
        <button className="underline text-xl p-5" onClick={returnTop}>
          上に戻る
        </button>
      </div>
    </>
  );
};

export default Home;
