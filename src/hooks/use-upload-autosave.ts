import { useState, useEffect } from 'react';

const STORAGE_KEY = 'marketplace_upload_draft';

interface UploadDraft {
  title: string;
  description: string;
  type: string;
  price: string;
  bpm: string;
  key: string;
  genre: string;
  tags: string;
  thumbnailFile?: File;
  audioFile?: File;
  downloadFile?: File;
  autoSaveEnabled: boolean;
}

export function useUploadAutosave() {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const saveDraft = (data: Partial<UploadDraft>) => {
    if (!autoSaveEnabled) return;
    
    const draft = {
      ...data,
      autoSaveEnabled,
      // We can't store File objects in localStorage, so we'll only store their names
      thumbnailFile: data.thumbnailFile?.name,
      audioFile: data.audioFile?.name,
      downloadFile: data.downloadFile?.name,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  const loadDraft = (): Partial<UploadDraft> | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    autoSaveEnabled,
    setAutoSaveEnabled,
    saveDraft,
    loadDraft,
    clearDraft,
  };
}