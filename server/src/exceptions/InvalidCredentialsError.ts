class InvalidCredentialsError extends Error {
    statusCode = 401;

    constructor(message: string) {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}
export default InvalidCredentialsError;