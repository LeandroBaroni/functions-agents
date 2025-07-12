import { AppError } from "./app-error.ts";

/**
 * Representa um erro específico de API, estendendo AppError.
 * Útil para criar erros específicos de API com códigos de status HTTP,
 * facilitando o tratamento e a resposta adequada aos erros de API.
 *
 * @class
 * @extends AppError
 *
 * @example
 * const erro = new ApiError('Requisição inválida', 'INVALID_REQUEST', 400);
 * console.log(erro.message); // 'Requisição inválida'
 * console.log(erro.code); // 'INVALID_REQUEST'
 * console.log(erro.statusCode); // 400
 */
export class ApiError extends AppError {
  /**
   * O código de status HTTP associado ao erro de API.
   */
  readonly statusCode: number;

  /**
   * @param message - A mensagem descritiva do erro de API.
   * @param code - O código único associado ao tipo de erro de API.
   * @param statusCode - O código de status HTTP (padrão é 400).
   */
  constructor(message: string, code: string, statusCode = 400) {
    super(message, code);
    this.statusCode = statusCode;
  }
}
