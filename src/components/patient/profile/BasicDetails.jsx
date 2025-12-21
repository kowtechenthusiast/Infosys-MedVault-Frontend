import ProfileInput from "./ProfileInput";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  MapPin,
  Edit,
  FileText,
  Upload,
  Image as ImageIcon,
  Check,
  Eye,
  Download,
} from "lucide-react";

export default function BasicDetails({
  formData,
  handleChange,
  handleFileChange,
  isEditing,
  setIsEditing,
  handleSave,
}) {
  const buttonBase =
    "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 justify-center";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* --- Header & Edit Toggle --- */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Personal Information
        </h3>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`${buttonBase} text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm`}
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <span
            className={`${buttonBase} bg-linear-to-r from-cyan-400 to-blue-500 text-white text-sm shadow-lg shadow-blue-500/20`}
          >
            <Edit size={16} />
            Editing Active
          </span>
        )}
      </div>

      <div className="space-y-8">
        {/* --- Profile Data Inputs --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileInput
            icon={User}
            label="Full Name"
            name="name"
            disabled={!isEditing}
            value={formData.name}
            onChange={handleChange}
          />
          <ProfileInput
            icon={Mail}
            label="Email"
            name="email"
            readOnly
            value={formData.email}
          />
          <ProfileInput
            icon={Phone}
            label="Phone Number"
            name="phone"
            disabled={!isEditing}
            value={formData.phone}
            onChange={handleChange}
          />
          <ProfileInput
            icon={Calendar}
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            disabled={!isEditing}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <ProfileInput
            icon={Heart}
            label="Blood Group"
            name="bloodGroup"
            disabled={!isEditing}
            value={formData.bloodGroup}
            onChange={handleChange}
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
          />
          <ProfileInput
            label="Gender"
            name="gender"
            disabled={!isEditing}
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />
        </div>

        {/* --- Address Details Section --- */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-blue-500" /> Current Residence
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileInput
              label="Address Line"
              name="address"
              disabled={!isEditing}
              value={formData.address}
              onChange={handleChange}
            />
            <ProfileInput
              label="City"
              name="city"
              disabled={!isEditing}
              value={formData.city}
              onChange={handleChange}
            />
            <ProfileInput
              label="State / Province"
              name="state"
              disabled={!isEditing}
              value={formData.state}
              onChange={handleChange}
            />
            <ProfileInput
              label="Pincode / Zip"
              name="pincode"
              disabled={!isEditing}
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* --- Compact ID Proof Section (Bottom) --- */}
        <div className="pt-6 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2 uppercase tracking-wide">
            <FileText size={16} className="text-blue-500" />
            ID Proof
          </h4>

          <div className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
            {/* Status */}
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              {formData.idProofPath ? (
                <>
                  <Check size={16} className="text-emerald-500" />
                  Document uploaded
                </>
              ) : (
                <>
                  <ImageIcon size={16} className="text-slate-400" />
                  No document uploaded
                </>
              )}
            </div>

            {/* Actions */}
            {formData.idProofPath && (
              <div className="flex items-center gap-2">
                {/* View */}
                <button
                  type="button"
                  onClick={() => {
                    const baseUrl = "http://localhost:8080";
                    const path = formData.idProofPath.startsWith("/")
                      ? formData.idProofPath
                      : `/${formData.idProofPath}`;
                    window.open(`${baseUrl}${path}`, "_blank");
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1"
                >
                  <Eye size={14} /> View
                </button>

                {/* Download */}
                <button
                  type="button"
                  onClick={async () => {
                    const baseUrl = "http://localhost:8080";
                    const path = formData.idProofPath.startsWith("/")
                      ? formData.idProofPath
                      : `/${formData.idProofPath}`;
                    const response = await fetch(`${baseUrl}${path}`);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = path.split("/").pop() || "id-proof";
                    link.click();
                    window.URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            )}

            {/* Upload (Edit mode only) */}
            {isEditing && (
              <div className="md:ml-auto relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                  <Upload size={14} />
                  {formData.idProof ? "Change File" : "Upload File"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Save Button --- */}
        {isEditing && (
          <div className="pt-8 flex justify-end">
            <button
              onClick={handleSave}
              className={`${buttonBase} text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-600/30`}
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
