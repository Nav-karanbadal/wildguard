import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

import Home from "./pages/Home"
import Wildlife from "./pages/Wildlife"
import WildlifeDetails from "./pages/WildlifeDetails"
import Programs from "./pages/Programs"
import ProgramDetails from "./pages/ProgramDetails"
import Blog from "./pages/Blog"
import BlogDetails from "./pages/BlogDetails"
import JoinTeam from "./pages/JoinTeam"
import Contact from "./pages/Contact"

function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main className="min-h-screen">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/wildlife" element={<Wildlife />} />

          <Route path="/wildlife/:id" element={<WildlifeDetails />} />

          <Route path="/programs" element={<Programs />} />

          <Route
            path="/programs/:id"
            element={<ProgramDetails />}
          />

          <Route path="/blog" element={<Blog />} />

          <Route
            path="/blog/:id"
            element={<BlogDetails />}
          />

          <Route path="/join" element={<JoinTeam />} />

          <Route path="/contact" element={<Contact />} />

        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App