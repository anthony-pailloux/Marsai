import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import VideoDetails from "./pages/VideoDetails.jsx";
import ParticipationUploadPage from "./pages/ParticipationUploadPage.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Jury from "./pages/Jury.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import Legal from "./pages/Legal.jsx";
import PartnersPage from "./pages/Partner.jsx";
import NewsletterConfirm from "./pages/NewsletterConfirm";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import LearnMore from "./pages/LearnMore.jsx";
import VideoFeed from "./pages/VideoFeed.jsx";
import AdminRegister from "./pages/Admin/AdminRegister.jsx";
import AdminLogin from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { AdminRouter } from "./pages/Admin/AdminRouter.jsx";
import AdminVideos from "./pages/Admin/AdminVideos.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import ToastHost from "./components/ui/ToastHost.jsx";

export default function App() {
  return (
    <>
    <ToastHost />
    <Routes>

      <Route element={<MainLayout />}>

        {/* ROUTES PUBLIQUES */}

        <Route path="/" element={<Home />} />

        {/* Galerie */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/feed/:id" element={<VideoFeed />} />
        <Route path="/gallery/:id" element={<VideoDetails />} />

        <Route path="/participation" element={<ParticipationUploadPage />} />
        <Route path="/learnMore" element={<LearnMore />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/jury" element={<Jury />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Navigate to="/legal" replace />} />
        <Route path="/terms" element={<Navigate to="/legal" replace />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/about" element={<About />} />

        {/* Newsletter */}
        <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
        <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />

        {/* auth/admin */}
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />



        {/* Routes avec obligation de connexion */}
        <Route element={<RequireAuth />}>

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminRouter />} />

          {/* SELECTOR */}
          <Route path="/selector/videos" element={<AdminVideos />} />

        </Route>

      </Route>



      <Route path="*" element={<NotFound />} />

    </Routes>
    </>
  );
}