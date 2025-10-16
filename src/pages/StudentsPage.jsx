import { useState } from 'react';
import { Plus, Edit, Trash2, Search, GraduationCap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function StudentPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: "John Michael",
      lastName: "Cabug",
      yearLevel: 3,
      course: "BS-IT"
    },
    {
      id: 2,
      firstName: "Maria",
      lastName: "Santos",
      yearLevel: 2,
      course: "BS-CS"
    },
    {
      id: 3,
      firstName: "Jose",
      lastName: "Reyes",
      yearLevel: 4,
      course: "BS-IT"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleAddStudent = () => {
    // Use this in your actual app with react-router: navigate('/addStudent');
    window.location.href = '/addStudent';
  };

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                Student Directory
              </h1>
              <p className="text-gray-400">Manage and view all student records</p>
            </div>
            <button
              onClick={handleAddStudent}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 ease-in-out flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:translate-y-[-2px]"
            >
              <Plus size={20} />
              Add Student
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or course..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_10px_#a855f7] transition"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600/20 p-3 rounded-lg">
                <GraduationCap className="text-purple-300" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-white">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <BookOpen className="text-blue-300" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Courses</p>
                <p className="text-2xl font-bold text-white">{new Set(students.map(s => s.course)).size}</p>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-green-600/20 p-3 rounded-lg">
                <Search className="text-green-300" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Search Results</p>
                <p className="text-2xl font-bold text-white">{filteredStudents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-900/30 border-b border-purple-500/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">First Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Last Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Year Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Course</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b border-white/5 hover:bg-purple-500/10 transition-colors ${
                        index % 2 === 0 ? 'bg-white/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{student.firstName}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{student.lastName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                          Year {student.yearLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30">
                          {student.course}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 p-2 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-500/50"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="bg-red-600/20 hover:bg-red-600/40 text-red-300 p-2 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500/50"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      No students found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>
    </div>
  );
}