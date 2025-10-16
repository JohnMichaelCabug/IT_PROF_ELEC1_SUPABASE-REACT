import { BrowserRouter, Routes, Route } from "react-router";
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/addStudent" element={<AddStudentPage />} />
        <Toaster position="bottom-right" />
      </Routes>
    </BrowserRouter>
  );
}
