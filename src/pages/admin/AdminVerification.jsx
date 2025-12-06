import VerificationCard from "../../components/admin/VerificationCard";

export default function AdminVerification() {
  const pendingAdmins = [
    {
      id: 1,
      name: "Naveen Kumar",
      status: "PENDING",
      certificate: "AdminProof22.pdf",
      role: "Sub-Admin Request",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Verification</h2>

      {pendingAdmins.map((admin) => (
        <VerificationCard key={admin.id} data={admin} role="admin" />
      ))}
    </div>
  );
}
