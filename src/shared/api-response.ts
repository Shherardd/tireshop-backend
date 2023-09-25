import { HttpStatus } from '@nestjs/common';

class ApiResponse<T> {
  constructor(
    public status: HttpStatus,
    public message: string,
    public data?: T,
  ) {}

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(HttpStatus.OK, message, data);
  }

  static created<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(HttpStatus.CREATED, message, data);
  }

  static error<T>(
    message: string,
    status = HttpStatus.BAD_REQUEST,
  ): ApiResponse<T> {
    return new ApiResponse<T>(status, message);
  }
}

export default ApiResponse;
