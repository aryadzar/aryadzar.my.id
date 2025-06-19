import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
import ProjectsPage from "./pages/ProjectsPage"
import { HelmetProvider } from "react-helmet-async"
import NotFoundPage from "./pages/ErrorPage"
import BlogPage from "./pages/BlogPage"
import BlogPostPage from "./pages/BlogPostPage"
import { Toaster } from 'react-hot-toast'
// import AnimatedCursor from "react-animated-cursor"
import { Analytics } from '@vercel/analytics/react';
import Footer from "./components/footer"
import ScrollToTop from "./utils/scrollToTop"
import PhotoGalleryView from "./pages/PhotoGallery"
import 'highlight.js/styles/github-dark.css';
import ProjectPostPage from "./pages/ProjectPostPage"
import UsesPage from "./pages/UsesPage"
function App() {
  return (
    <>
      <HelmetProvider>
        <ScrollToTop />
        <Toaster position="top-right" reverseOrder={false} />
        {/* <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={2}
        outerStyle={{
          mixBlendMode: 'difference',
          backgroundColor: 'white'
        }}
        innerStyle={{
          mixBlendMode: 'difference',
          backgroundColor: 'white'
        }}
      /> */}
        <Navbar />
              <div className="absolute inset-0 pointer-events-none  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/project" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectPostPage />} />
          <Route path="/gallery" element={<PhotoGalleryView />} />
          <Route path="/uses" element={<UsesPage/>}/>
          <Route path="*" element={<NotFoundPage status={404} />} />
        </Routes>
        <Footer />
        <Analytics />
      </HelmetProvider>
    </>
  )
}

export default App

