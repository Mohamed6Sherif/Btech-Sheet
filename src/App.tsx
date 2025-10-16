import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import AddStudent from "./pages/AddStudent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <div dir="rtl" className="bg-light min-vh-100">
        {/* ✅ شريط علوي */}
        <header className="bg-primary text-white shadow-sm py-4 mb-5">
          <div className="container text-center">
            <h1 className="fw-bold mb-4 d-flex justify-content-center align-items-center gap-2 fs-2">
              🎓 كورسات محمد شريف 🎓
            </h1>

            <nav className="d-flex justify-content-center flex-wrap gap-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `btn btn-lg rounded-pill fw-semibold px-4 ${
                    isActive
                      ? "btn-light text-primary shadow-sm border border-2 border-white"
                      : "btn-outline-light"
                  }`
                }
              >
                الرئيسية
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `btn btn-lg rounded-pill fw-semibold px-4 ${
                    isActive
                      ? "btn-light text-primary shadow-sm border border-2 border-white"
                      : "btn-outline-light"
                  }`
                }
              >
                الكورسات
              </NavLink>

              <NavLink
                to="/students"
                className={({ isActive }) =>
                  `btn btn-lg rounded-pill fw-semibold px-4 ${
                    isActive
                      ? "btn-light text-primary shadow-sm border border-2 border-white"
                      : "btn-outline-light"
                  }`
                }
              >
                إضافة طالب
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="container pb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/students" element={<AddStudent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
