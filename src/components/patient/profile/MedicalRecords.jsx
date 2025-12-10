import { useEffect, useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  Download,
  Eye,
  Lock,
  Slash,
} from "lucide-react";

export default function MedicalRecords({ patientId, mustSetPasswordFirst }) {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isDisabled = mustSetPasswordFirst;
  const buttonBase =
    "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 justify-center text-sm";

  // Fetch stored documents
  const fetchRecords = async () => {
    if (isDisabled) return; // Prevent fetch if locked
    try {
      const res = await fetch(
        `http://localhost:8080/api/documents/patient/${patientId}`
      );
      if (res.ok) {
        setRecords(await res.json());
      }
    } catch (err) {
      console.error("Error loading documents:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [patientId, isDisabled]);

  // Upload new medical record
  const uploadRecord = async () => {
    if (!file) return alert("Please select a file.");

    setUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("patientId", patientId);
    form.append("uploadDate", new Date().toISOString());

    try {
      const res = await fetch("http://localhost:8080/api/documents/upload", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Record uploaded successfully!");
        setFile(null);
        fetchRecords();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Delete a document
  const deleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/documents/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecords((prev) => prev.filter((rec) => rec.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Digital Medical Records
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Lock Warning */}
      {isDisabled && (
        <div className="text-center bg-slate-50 border border-slate-200 p-6 rounded-2xl text-slate-500 font-medium flex items-center justify-center gap-3">
          <Slash size={18} className="text-red-400" />
          This section is locked until you set your account password in Basic
          Details.
        </div>
      )}

      {/* Upload Section (Styled with Glassmorphism and disabled state) */}
      <section
        className={`rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-md border border-white/60 transition-opacity duration-300
        ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <UploadCloud
            size={60}
            className="text-blue-500 mb-4 animate-bounce-slow"
          />

          <h2 className="text-xl font-bold text-slate-800">
            Secure Document Upload
          </h2>
          <p className="text-slate-500 max-w-md">
            Upload prescriptions, lab reports, scans, X-rays etc. (PDF, JPG,
            PNG). Files are encrypted and stored securely.
          </p>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {!file ? (
            <label
              htmlFor="file-upload"
              className={`${buttonBase} mt-4 text-blue-600 bg-white border border-blue-400 
                hover:bg-blue-50 cursor-pointer shadow-md`}
            >
              <FileText size={20} /> Choose File to Upload
            </label>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white border border-blue-200 shadow-sm rounded-xl px-6 py-3 flex items-center gap-4 font-medium text-slate-700">
                <FileText className="text-blue-500" />
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <button
                onClick={uploadRecord}
                disabled={uploading}
                className={`${buttonBase} text-white mt-2
                  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                  shadow-lg shadow-blue-600/30 disabled:opacity-50`}
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stored Records Table */}
      <section
        className={`rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-md border border-white/60 transition-opacity duration-300
          ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
      >
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FileText size={20} className="text-indigo-500" /> Your Stored Records
          ({records.length})
        </h2>

        {records.length === 0 ? (
          <p className="text-slate-500 text-center py-6 bg-slate-50/50 rounded-xl border border-slate-100">
            No medical records uploaded yet. Use the section above to begin.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/60 text-blue-700 text-sm uppercase tracking-wider font-semibold">
                  <th className="p-4 rounded-tl-xl">Document Name</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4 text-center rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr
                    key={rec.id}
                    className="border-b border-slate-100 hover:bg-blue-50/50 transition"
                  >
                    <td className="p-4 flex items-center gap-3 font-medium text-slate-700">
                      <FileText className="text-indigo-400" size={18} />{" "}
                      {rec.fileName}
                    </td>

                    <td className="p-4 text-slate-500 text-sm">
                      {new Date(rec.uploadDate).toLocaleDateString()}
                    </td>

                    <td className="p-4 flex justify-center gap-5">
                      {/* View */}
                      <a
                        href={rec.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform"
                        title="View Document"
                      >
                        <Eye size={20} />
                      </a>

                      {/* Download */}
                      <a
                        href={rec.fileUrl}
                        download
                        className="text-emerald-600 hover:text-emerald-800 hover:scale-110 transition-transform"
                        title="Download Document"
                      >
                        <Download size={20} />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => deleteRecord(rec.id)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                        title="Delete Document"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
