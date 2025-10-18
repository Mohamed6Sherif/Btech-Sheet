import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Student {
  id: number;
  name: string;
  course: string;
  attendance: boolean[];
  paid: boolean;
  fee: number;
  rating: number;
}

const CoursesPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const courses = [
    { id: "computer", name: "تأسيس الكمبيوتر" },
    { id: "english", name: "تأسيس الإنجليزي" },
    { id: "programming", name: "تأسيس البرمجة" },
    { id: "eng_basics", name: "تأسيس الإنجليزي أطفال" },
    { id: "eng_school", name: "منهج الإنجليزي" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  return (
    <div dir="rtl" className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">
        📚 قائمة الكورسات
      </h2>

      <div className="row g-4">
        {courses.map((course) => {
          const courseStudents = students.filter((s) => s.course === course.id);
          const total = courseStudents.length;
          const paid = courseStudents.filter((s) => s.paid).length;
          const unpaid = total - paid;

          return (
            <div className="col-md-4" key={course.id}>
              <div className="card shadow border-0 h-100">
                <div className="card-body text-center">
                  <h4 className="fw-bold mb-3 text-primary">{course.name}</h4>
                  <p className="mb-2">👨‍🎓 عدد الطلاب: {total}</p>
                  <p className="text-success mb-1">✅ دافعين: {paid}</p>
                  <p className="text-danger mb-3">💸 لسه مدفعوش: {unpaid}</p>

                  <Link
                    to={`/courses/${course.id}`}
                    className="btn btn-primary px-4 rounded-pill"
                  >
                    عرض الطلاب
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
