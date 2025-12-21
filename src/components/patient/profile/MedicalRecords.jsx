import { useEffect, useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  Download,
  Eye,
  Lock,
  Slash,
  X,
} from "lucide-react";

export default function MedicalRecords({ patientId, mustSetPasswordFirst }) {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [activeRecord, setActiveRecord] = useState(null);
  const isDisabled = mustSetPasswordFirst;

  /* ================= FETCH ================= */

  const fetchRecords = async () => {
    if (isDisabled) return;
    const res = await fetch(
      `http://localhost:8080/api/medical-records/patient/${patientId}`
    );
    if (res.ok) setRecords(await res.json());
  };

  useEffect(() => {
    fetchRecords();
  }, [patientId, isDisabled]);

  /* ================= UPLOAD ================= */

  const uploadRecord = async () => {
    if (!file) return alert("Select a file");

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("patientId", patientId);

    const res = await fetch(
      "http://localhost:8080/api/medical-records/upload",
      { method: "POST", body: form }
    );

    setUploading(false);
    setFile(null);
    if (res.ok) fetchRecords();
  };

  /* ================= DELETE ================= */

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await fetch(`http://localhost:8080/api/medical-records/${id}`, {
      method: "DELETE",
    });
    fetchRecords();
  };

  /* ================= REVOKE ACCESS ================= */

  const revokeAccess = async (recordId, doctorId) => {
    await fetch("http://localhost:8080/api/medical-records/revoke-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId, doctorId }),
    });
    fetchRecords();
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-10">
      {/* Header */}
      <h3 className="text-2xl font-extrabold text-slate-800">
        Digital Medical Records
      </h3>

      {/* Locked */}
      {isDisabled && (
        <div className="bg-slate-50 border p-6 rounded-xl text-center flex items-center justify-center gap-2">
          <Slash className="text-red-500" />
          Set password first to unlock this section
        </div>
      )}

      {/* Upload */}
      <section
        className={`rounded-3xl p-8 bg-white border shadow-sm ${
          isDisabled ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <div className="text-center space-y-4">
          <UploadCloud size={56} className="mx-auto text-blue-500" />
          <p className="text-slate-500">
            Upload prescriptions, lab reports, scans (PDF / Images)
          </p>

          <input
            type="file"
            hidden
            id="upload"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {!file ? (
            <label
              htmlFor="upload"
              className="cursor-pointer inline-flex gap-2 items-center px-6 py-3 border rounded-xl"
            >
              <FileText /> Choose File
            </label>
          ) : (
            <div className="flex items-center gap-3 justify-center">
              <span className="font-medium">{file.name}</span>
              <button onClick={() => setFile(null)}>
                <Trash2 className="text-red-500" />
              </button>
            </div>
          )}

          {file && (
            <button
              onClick={uploadRecord}
              disabled={uploading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
      </section>

      {/* Records */}
      <section
        className={`rounded-3xl p-8 bg-white border shadow-sm ${
          isDisabled ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <h4 className="text-xl font-bold mb-4">
          Stored Records ({records.length})
        </h4>

        {records.length === 0 ? (
          <p className="text-slate-500">No records uploaded yet</p>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-4 text-left">Document</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((rec) => {
                console.log(rec);
                return (
                  <tr
                    key={rec.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    {/* Document */}
                    <td className="p-4 flex gap-2 items-center font-medium text-slate-700">
                      <FileText className="text-indigo-500" />
                      {rec.fileName}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-center text-sm text-slate-500">
                      {new Date(rec.uploadDate).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex justify-center flex-wrap gap-3">
                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() => window.open(rec.fileUrl, "_blank")}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                             bg-slate-100 text-slate-700 hover:bg-slate-200
                             border border-slate-200 transition"
                        >
                          <Eye size={16} /> View
                        </button>

                        {/* DOWNLOAD */}
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const response = await fetch(rec.fileUrl);
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);

                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute(
                                "download",
                                rec.fileName || "medical-record"
                              );

                              document.body.appendChild(link);
                              link.click();
                              link.remove();
                              window.URL.revokeObjectURL(url);
                            } catch (err) {
                              console.error("Download failed:", err);
                              alert("Could not download file.");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                             bg-blue-50 text-blue-700 hover:bg-blue-100
                             border border-blue-100 transition"
                        >
                          <UploadCloud size={16} className="rotate-180" />
                          Download
                        </button>

                        {/* ACCESS CONTROL */}
                        <button
                          onClick={() => setActiveRecord(rec)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                             bg-indigo-50 text-indigo-700 hover:bg-indigo-100
                             border border-indigo-100 transition"
                        >
                          <Lock size={16} /> Access
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteRecord(rec.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                             bg-red-50 text-red-600 hover:bg-red-100
                             border border-red-100 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {/* ================= ACCESS MODAL ================= */}
      {activeRecord && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold">Doctors with Access</h4>
              <button onClick={() => setActiveRecord(null)}>
                <X />
              </button>
            </div>

            {activeRecord.allowedDoctors?.length === 0 ? (
              <p className="text-slate-500 text-center py-6">
                No doctor currently has access to this record.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {activeRecord.allowedDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex justify-between items-center border p-3 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-xs text-slate-500">
                        {doc.specialization}
                      </p>
                    </div>

                    <button
                      onClick={() => revokeAccess(activeRecord.id, doc.id)}
                      className="px-4 py-2 rounded-xl text-sm font-bold bg-red-50 text-red-600"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setActiveRecord(null)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
