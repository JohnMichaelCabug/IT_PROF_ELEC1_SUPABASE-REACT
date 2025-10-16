import { useState } from 'react';
import { User, Save } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';  // Correct import

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    yearLevel: '',
    course: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Use navigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const studentData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        year_level: parseInt(formData.yearLevel, 10),  // Make sure this is an integer
        course: formData.course
      };

      const { data, error } = await supabase
        .from('students')
        .insert([studentData]);

      if (error) {
        toast.error("Failed to add student. Please try again.");
      } else {
        toast.success("Student added successfully!");
        setFormData({ firstName: '', lastName: '', yearLevel: '', course: '' });
        navigate('/');  // Redirect after success
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            Student Management
          </h1>
          <p className="text-gray-400">Add a new student record</p>
        </div>

        {/* Form Card */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-purple-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600/20 p-3 rounded-xl shadow-inner shadow-purple-700/30">
              <User className="text-purple-300" size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.2)]">
              Add New Student
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_10px_#a855f7] transition"
                placeholder="Enter first name"
                disabled={loading}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_10px_#a855f7] transition"
                placeholder="Enter last name"
                disabled={loading}
              />
            </div>

            {/* Year Level */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Year Level
              </label>
              <select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_10px_#a855f7] transition"
                disabled={loading}
              >
                <option value="" className="bg-[#1f1b3a] text-gray-400">Select year level</option>
                <option value="1" className="bg-[#1f1b3a]">1st Year</option>
                <option value="2" className="bg-[#1f1b3a]">2nd Year</option>
                <option value="3" className="bg-[#1f1b3a]">3rd Year</option>
                <option value="4" className="bg-[#1f1b3a]">4th Year</option>
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_10px_#a855f7] transition"
                placeholder="e.g., BS-IT, BS-CS"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 ease-in-out flex items-center justify-center gap-2 shadow-md shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:translate-y-[-2px]"
            >
              <Save size={20} />
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </form>
        </div>

        {/* Toast Container */}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}
