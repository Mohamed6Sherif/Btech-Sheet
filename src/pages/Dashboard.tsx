import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Student {
  id: number;
  name: string;
  course: string;
  attendance: boolean[];
  paid: boolean;
  rating: string;
}

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  // حساب البيانات
  const totalStudents = students.length;
  const totalPaid = students.filter((s) => s.paid).length;
  const totalUnpaid = students.filter((s) => !s.paid).length;

  // سعر الاشتراك الشهري
  const MONTHLY_FEE = 150;

  const totalIncome = totalPaid * MONTHLY_FEE;
  const expectedIncome = totalStudents * MONTHLY_FEE;

  const courses = [
    { id: "computer", name: "تأسيس كمبيوتر" },
    { id: "english", name: "تأسيس إنجليزي" },
    { id: "programming", name: "تأسيس برمجة" },
  ];

  return (
    <div dir="rtl" className="container py-4">
      <h1 className="text-center fw-bold mb-5 text-primary">📊 لوحة التحكم</h1>

      {/* ✅ الكروت الإحصائية */}
      <div className="row g-4 mb-5 text-center">
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-secondary mb-2">عدد الطلاب الكلي</h6>
              <h3 className="text-primary fw-bold">{totalStudents}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-secondary mb-2">دافعين</h6>
              <h3 className="text-success fw-bold">{totalPaid}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-secondary mb-2">لسه مدفعوش</h6>
              <h3 className="text-danger fw-bold">{totalUnpaid}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-secondary mb-2">المبلغ المستلم</h6>
              <h3 className="text-purple fw-bold text-success">
                {totalIncome} جنيه
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-secondary mb-2">المتوقع للشهر</h6>
              <h3 className="text-warning fw-bold">{expectedIncome} جنيه</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ جدول الكورسات */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-bold mb-4">📘 تفاصيل الكورسات</h4>

          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-primary">
                <tr>
                  <th>الكورس</th>
                  <th>عدد الطلاب</th>
                  <th>دافعين</th>
                  <th>لسه مدفعوش</th>
                  <th>الإيراد</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => {
                  const courseStudents = students.filter(
                    (s) => s.course === c.id
                  );
                  const paid = courseStudents.filter((s) => s.paid).length;
                  const unpaid = courseStudents.filter((s) => !s.paid).length;
                  const income = paid * MONTHLY_FEE;

                  return (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{courseStudents.length}</td>
                      <td className="text-success fw-semibold">{paid}</td>
                      <td className="text-danger fw-semibold">{unpaid}</td>
                      <td className="fw-bold">{income} جنيه</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
