export const authService = {
    login: async (email, password) => {
        // TODO: Implement actual API call
        console.log('Login attempt:', { email, password });

        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    resolve({ success: true, user: { email, name: 'User' } });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    },

    signup: async (name, email, password) => {
        // TODO: Implement actual API call
        console.log('Signup attempt:', { name, email, password });

        // Simulated API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password) {
                    resolve({ success: true, user: { email, name } });
                } else {
                    reject(new Error('Registration failed'));
                }
            }, 1500);
        });
    }
};
