import ApplicationError from './applicationError';

class NotFoundRequestError extends ApplicationError {
  constructor(message) {
    super(message, 404);
  }
}

export default NotFoundRequestError;
