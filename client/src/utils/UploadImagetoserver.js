const uploadImagesToServer = async (selectedFiles) => {
  if (!selectedFiles || selectedFiles.length === 0) {
    return [];
  }
  
  try {
    if (typeof selectedFiles === 'string' || Array.isArray(selectedFiles) && typeof selectedFiles[0] === 'string') {
      const images = typeof selectedFiles === 'string' ? [selectedFiles] : selectedFiles;
      
      console.log("Sending base64 images to server, count:", images.length);
      
      const response = await fetch('http://localhost:10000/api/images/upload-base64', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images })
      });
      
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.log("Server response:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Error uploading images');
        } catch (parseError) {
          throw new Error(`Server error: ${errorText.substring(0, 100)}...`);
        }
      }
      
      const data = await response.json();
      return data.imageUrls;
    } else {
      // For file objects
      const formData = new FormData();
      
      for (const file of selectedFiles) {
        formData.append('images', file);
      }
      
      const response = await fetch('http://localhost:10000/api/images/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Error uploading images');
        } catch (parseError) {
          throw new Error(`Server error: ${errorText.substring(0, 100)}...`);
        }
      }
      
      const data = await response.json();
      return data.imageUrls;
    }
  } catch (error) {
    console.log("Upload error details:", error);
    throw error;
  }
};

export default uploadImagesToServer;