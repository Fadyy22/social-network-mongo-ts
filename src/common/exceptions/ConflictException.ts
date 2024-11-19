import HttpException from './HttpException';

export default class ConflictException extends HttpException {
  constructor(message: string = 'Duplicate resource') {
    super(message, 409);
  }
}
