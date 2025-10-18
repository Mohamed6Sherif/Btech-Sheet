import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Student {
  id: number;
  name: string;
  course: string;
  paid: boolean;
  fee: number;
  rating: number;
}

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [courseName, setCourseName] = useState("");

  const courseTitles: Record<string, string> = {
    computer: "تأسيس الكمبيوتر",
    english: "تأسيس الإنجليزي",
    programming: "تأسيس البرمجة",
    eng_basics: "تأسيس الإنجليزي أطفال",
    eng_school: "منهج الإنجليزي",
  };

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) setStudents(JSON.parse(savedStudents));

    if (courseId && courseTitles[courseId]) {
      setCourseName(courseTitles[courseId]);
    }
  }, [courseId]);

  const updateStudent = (updated: Student) => {
    const updatedList = students.map((s) =>
      s.id === updated.id ? updated : s
    );
    setStudents(updatedList);
    localStorage.setItem("students", JSON.stringify(updatedList));
  };

  // 🗑️ دالة حذف الطالب
  const deleteStudent = (id: number) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الطالب؟")) {
      const updatedList = students.filter((s) => s.id !== id);
      setStudents(updatedList);
      localStorage.setItem("students", JSON.stringify(updatedList));
    }
  };

  const filtered = students.filter((s) => s.course === courseId);

  return (
    <div dir="rtl" className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="text-center text-primary fw-bold mb-4">
            🧾 قائمة طلاب {courseName}
          </h2>

          {filtered.length === 0 ? (
            <div className="alert alert-danger text-center fs-5">
              لا يوجد طلاب بعد. قم بإضافتهم من صفحة <strong>إضافة طالب</strong>.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th>الاسم</th>
                    <th>الدفع</th>
                    <th>التقييم الشهري</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id}>
                      <td className="fw-semibold">{student.name}</td>

                      <td>
                        <input
                          title="pay"
                          type="checkbox"
                          className="form-check-input"
                          checked={student.paid}
                          onChange={() =>
                            updateStudent({
                              ...student,
                              paid: !student.paid,
                            })
                          }
                        />
                      </td>

                      <td>
                        <input
                          title="rate"
                          type="number"
                          min="0"
                          max="100"
                          className="form-control text-center mx-auto"
                          style={{ width: "100px" }}
                          value={student.rating}
                          onChange={(e) =>
                            updateStudent({
                              ...student,
                              rating: Number(e.target.value),
                            })
                          }
                        />
                      </td>

                      {/* 🗑️ زر الحذف */}
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteStudent(student.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
