import HttpException from './HttpException';

export default class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}
