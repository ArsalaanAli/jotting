import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  label?: string;
  accept?: string;
  helperText?: string;
  error?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = '*',
  helperText,
  error,
  onChange,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    onChange(file);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2000);
  };

  const handleClear = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
          ${error ? 'border-red-300' : ''} 
          transition-colors duration-200
          ${uploadSuccess ? 'bg-green-50 border-green-500' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        
        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(value.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            {uploadSuccess ? (
              <div className="mx-auto flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-2 mb-2">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-800">File uploaded successfully!</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {helperText || `Supported file types: ${accept}`}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      
      {!value && (
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            icon={<Upload className="w-4 h-4" />}
          >
            Browse Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;