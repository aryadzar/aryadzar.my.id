import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
// import BlogPage from "./pages/BlogPage"
// import BlogPostPage from "./pages/BlogPostPage"
import ProjectsPage from "./pages/ProjectsPage"
import { HelmetProvider } from "react-helmet-async"
import NotFoundPage from "./pages/ErrorPage"

function App() {
  return (
    <>
      <HelmetProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} /> */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFoundPage status={404} />} />
        </Routes>

      </HelmetProvider>
    </>
  )
}

export default App

