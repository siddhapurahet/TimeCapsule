// Upload helper function - can be placed in a utils file
const uploadImagesToServer = async (selectedFiles) => {
    // If no files, return empty array
    if (!selectedFiles || selectedFiles.length === 0) {
      return [];
    }
  
    // For base64 strings (which is what your current code uses)
    if (typeof selectedFiles === 'string' || Array.isArray(selectedFiles)) {
      // Convert to array if it's a single string
      const images = typeof selectedFiles === 'string' ? [selectedFiles] : selectedFiles;
      
      const response = await fetch('/api/images/upload-base64', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error uploading images');
      }
      
      const data = await response.json();
      return data.imageUrls;
    }
    
    // For actual File objects (if you switch to using File input)
    else {
      const formData = new FormData();
      
      // Append each file to the form data
      for (const file of selectedFiles) {
        formData.append('images', file);
      }
      
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error uploading images');
      }
      
      const data = await response.json();
      return data.imageUrls;
    }
  };