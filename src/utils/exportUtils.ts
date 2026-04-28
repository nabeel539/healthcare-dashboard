/**
 * Utility to export an array of objects to a CSV file and trigger a download.
 */
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  // Define which fields to export and their labels
  const fieldMapping = {
    id: 'Patient ID',
    name: 'Full Name',
    age: 'Age',
    gender: 'Gender',
    condition: 'Primary Condition',
    status: 'Status',
    lastVisit: 'Last Visit',
    createdAt: 'Record Created'
  };

  const headers = Object.values(fieldMapping);
  const keys = Object.keys(fieldMapping);
  
  // Create CSV rows
  const csvRows = [];
  
  // Add headers row
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = keys.map(key => {
      let val = row[key];
      
      // Handle Firestore Timestamps or Dates
      if (val && typeof val === 'object' && val.toDate) {
        val = val.toDate().toISOString();
      } else if (val instanceof Date) {
        val = val.toISOString();
      } else if (val === null || val === undefined) {
        val = '';
      }
      
      // Escape commas and quotes for CSV
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Create blob with UTF-8 BOM for Excel compatibility
  const csvString = csvRows.join('\r\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
