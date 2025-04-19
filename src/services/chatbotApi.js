export const getAIMessage = async (userQuery) => {
  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userQuery),
  });

  const data = await response.json();
  console.log(data);
  return data;
};