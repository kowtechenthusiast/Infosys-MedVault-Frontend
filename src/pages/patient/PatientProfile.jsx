export default function PatientProfile() {
  const user = {
    name: "Kajal Kumar",
    age: 21,
    phone: "9876543210",
    email: "kajal@example.com",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>

      <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border shadow-md w-[450px]">
        <label className="block font-semibold text-gray-700 mt-2">Name</label>
        <input
          className="w-full border px-4 py-2 rounded-xl"
          defaultValue={user.name}
        />

        <label className="block font-semibold text-gray-700 mt-4">Age</label>
        <input
          className="w-full border px-4 py-2 rounded-xl"
          defaultValue={user.age}
        />

        <label className="block font-semibold text-gray-700 mt-4">Phone</label>
        <input
          className="w-full border px-4 py-2 rounded-xl"
          defaultValue={user.phone}
        />

        <label className="block font-semibold text-gray-700 mt-4">Email</label>
        <input
          className="w-full border px-4 py-2 rounded-xl"
          defaultValue={user.email}
        />

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
