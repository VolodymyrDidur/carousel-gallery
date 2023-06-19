import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

type AbstractError = {
  name: string;
  message: string;
  type: string;
  stack: unknown;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];

    if (exception instanceof HttpException) {
      // that branch meaning its the handled error (http already)
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message =
          (exceptionResponse as AbstractError).message ||
          HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
      }

      this.logger.warn(exception);
    } else {
      // log any such error with original message and stack trace
      this.logger.error(exception);
    }

    const responseBody = { statusCode, message };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
