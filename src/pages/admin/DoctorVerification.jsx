import VerificationCard from "../../components/admin/VerificationCard";

export default function DoctorVerification() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Rohit Sharma",
      status: "PENDING",
      certificate: "MedicalLicense123.pdf",
      specialization: "Cardiologist",
      experience: "12 years",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      status: "PENDING",
      certificate: "MedCert987.pdf",
      specialization: "Dermatologist",
      experience: "7 years",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Doctor Verification</h2>

      {doctors.map((doc) => (
        <VerificationCard key={doc.id} data={doc} role="doctor" />
      ))}
    </div>
  );
}
