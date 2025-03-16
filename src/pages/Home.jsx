import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      <Header />

      <section className="mt-4">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
