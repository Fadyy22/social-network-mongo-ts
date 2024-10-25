import HttpException from './HttpException';

export default class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}
