const authService = {
  getUserInfo: async (token) => {
    try {
      const response = await fetch(`http://localhost:8000/me`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      
      if (!response.ok) {
        throw new Error('Unable to fetch user information');
      }

      const data = await response.json();
      
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data));

      return data;
    } catch (error) {
      throw new Error('Unable to fetch user information');
    }
  },
};

export default authService;
