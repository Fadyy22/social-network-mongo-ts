import HttpException from './HttpException';

export default class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
