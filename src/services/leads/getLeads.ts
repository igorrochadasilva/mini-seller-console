export const getLeads = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const response = await fetch('http://localhost:3000/leads');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  
  return data;
};
