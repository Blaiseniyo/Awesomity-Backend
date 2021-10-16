import ApplicationError from './applicationError';

class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message, 401);
  }
}

export default AuthorizationError;
