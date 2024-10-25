import HttpException from './HttpException';

export default class MethodNotAllowedException extends HttpException {
  constructor(message: string = 'Method Not Allowed') {
    super(message, 405);
  }
}
