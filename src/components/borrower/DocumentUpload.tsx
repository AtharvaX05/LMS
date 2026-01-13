import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UploadedDocument {
  id: number;
  document_type: string;
  file_name: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  uploaded_at: string;
}

interface DocumentUploadProps {
  userId: number;
  token: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ userId, token }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('identity');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const documentTypes = [
    { value: 'identity', label: 'Identity Proof (Passport/Driver License)' },
    { value: 'income', label: 'Income Proof (Salary Slip/Tax Return)' },
    { value: 'address', label: 'Address Proof (Utility Bill/Lease Agreement)' },
    { value: 'bank_statement', label: 'Bank Statement (Last 3 Months)' },
    { value: 'employment', label: 'Employment Letter' },
    { value: 'other', label: 'Other Documents' },
  ];

  // Fetch user's documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoadingDocs(true);
      const response = await axios.get(`${API_URL}/api/documents/my-documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data.documents);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PDF, JPEG, PNG, and DOC files are allowed');
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setSuccess(null);

      const formData = new FormData();
      formData.append('document', file);
      formData.append('document_type', documentType);

      const response = await axios.post(`${API_URL}/api/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Document uploaded successfully! It will be verified shortly.');
      setFile(null);
      setDocumentType('identity');
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      // Refresh documents list
      fetchDocuments();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✓ Verified</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">✗ Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">⏳ Pending</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-[#003D82] mb-4">Document Verification</h3>
      
      {/* Upload Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Upload Document</h4>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type *
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003D82] focus:border-transparent"
              required
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#003D82] transition">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                {file ? (
                  <div>
                    <p className="text-green-600 font-semibold">✓ {file.name}</p>
                    <p className="text-sm text-gray-500">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600">📄 Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG, or DOC (Max 10MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full bg-[#003D82] text-white py-2 rounded-lg font-medium hover:bg-[#002a59] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>

      {/* Documents List Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Documents</h4>
        
        {loadingDocs ? (
          <p className="text-gray-500">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet. Upload your documents above to start the verification process.</p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{doc.document_type.replace(/_/g, ' ').toUpperCase()}</p>
                  <p className="text-sm text-gray-600">{doc.file_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4">
                  {getVerificationBadge(doc.verification_status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>📋 Verification Status:</strong> Your documents are reviewed by our compliance team within 24-48 hours. Once verified, your verification status will be updated.
        </p>
      </div>
    </div>
  );
};

export default DocumentUpload;
