import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  course: string;
  paid: boolean;
  fee: number;
  rating: number;
}

const AddStudent: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [course, setCourse] = useState("computer");
  const [fee, setFee] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);

  // تحميل الطلاب المحفوظين
  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      setStudents(JSON.parse(saved));
    }
  }, []);

  // ✅ عند تغيير الكورس نحدّث الرسوم تلقائيًا
  useEffect(() => {
    if (course === "programming") {
      setFee(300);
    } else if (course === "computer") {
      setFee(150);
    } else if (course === "english") {
      setFee(150);
    } else if (course === "eng_basics") {
      setFee(50);
    } else if (course === "eng_school") {
      setFee(50);
    }
  }, [course]);

  // حفظ الطلاب عند الإضافة
  const saveToLocalStorage = (data: Student[]) => {
    localStorage.setItem("students", JSON.stringify(data));
  };

  // إضافة طالب جديد
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("من فضلك أدخل اسم الطالب");
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name,
      course,
      paid: false,
      fee,
      rating: 0,
    };

    const updatedList = [...students, newStudent];
    setStudents(updatedList);
    saveToLocalStorage(updatedList);

    alert("✅ تم إضافة الطالب بنجاح!");
    setName("");

    // تحويل المستخدم لصفحة الكورس
    navigate(`/course/${course}`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 max-w-lg mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">
        إضافة طالب جديد
      </h2>

      <form onSubmit={handleAddStudent} className="space-y-4">
        {/* الاسم */}
        <div>
          <label className="block font-semibold mb-1">اسم الطالب:</label>
          <input
            type="text"
            placeholder="ادخل اسم الطالب"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* الكورس */}
        <div>
          <label className="block font-semibold mb-1">اختر الكورس:</label>
          <select
            title="courses"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="form-select border border-gray-300 p-2 rounded w-full"
          >
            <option value="computer">تأسيس الكمبيوتر</option>
            <option value="english">تأسيس الإنجليزي</option>
            <option value="programming">تأسيس البرمجة</option>
            <option value="eng_basics">تأسيس إنجليزي أطفال</option>
            <option value="eng_school">منهج إنجليزي</option>
          </select>
        </div>

        {/* الرسوم */}
        <div>
          <label className="block font-semibold mb-1">
            الرسوم الشهرية (جنيه):
          </label>
          <input
            title="payment"
            type="number"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
            className="form-control border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* زر الإضافة */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            حفظ الطالب
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
