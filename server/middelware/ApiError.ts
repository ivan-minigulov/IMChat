class ApiError extends Error {
  status
  message
  errors

  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.message = message
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message: string) {
    return new ApiError(404, message)
  }

  static Internal(message: string) {
    return new ApiError(500, message)
  }

  static Farbidden(message: string) {
    return new ApiError(403, message)
  }
}

module.exports = ApiError
