class AuthenticationError extends Error {
    statusCode = 500;

    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
export default AuthenticationError;