import HttpException from './HttpException';

export default class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}
