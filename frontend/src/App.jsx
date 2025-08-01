import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import styles from "./App.module.css"; // CSS 모듈 임포트

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
