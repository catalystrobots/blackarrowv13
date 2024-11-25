export interface FileUploadStatus {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  dimensions?: {
    x: number;
    y: number;
    z: number;
  };
  material?: string;
  finish?: string;
  quantity: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string | null;
}