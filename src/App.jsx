import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import DownloadPage from './pages/DownloadPage/DownloadPage'
import Terms from './pages/Terms/Terms'
import NotFound from './pages/NotFound/NotFound'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/download/:id" element={<DownloadPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
       <Footer />
    </>
  )
}

export default App