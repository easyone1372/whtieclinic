export const fetchEngineerList = async () => {
  const response = await fetch('/api/engineers');
  if (!response.ok) {
    throw new Error('Failed to fetch engineer list');
  }
  return response.json();
};
