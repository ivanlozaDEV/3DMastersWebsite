const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      saludo: "Hola",
      items: [],
      users: []
    },
    actions: {
      createUser: async (name, username, password) => {
        try {
          const response = await fetch(
            import.meta.env.VITE_API_URL + "/1$9DJS470cMFeSks4F$",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                username,
                password
              }),
            }
          );
          
          if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error creating user:', errorDetails);
            return false;
          }
          
          const newUser = await response.json();
          
          // Update the store with the new user
          setStore(store => ({
            ...store,
            users: [...store.users, newUser]
          }));
          
          return true;
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      },

      // You can add more actions here as needed
    },
  };
};

export default getState;