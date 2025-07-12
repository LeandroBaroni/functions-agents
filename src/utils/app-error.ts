/**
 * Representa um erro base personalizado para a aplicação.
 *
 * @class
 *
 * @example
 * const erro = new AppError('Erro ao processar dados', 'PROC_ERR_001');
 * console.log(erro.message); // 'Erro ao processar dados'
 * console.log(erro.code); // 'PROC_ERR_001'
 */
export class AppError {
  /**
   * A mensagem descritiva do erro.
   */
  readonly message: string;

  /**
   * O código associado ao erro.
   */
  readonly code: string;

  /**
   * @param message - A mensagem descritiva do erro.
   * @param code - O código único associado ao tipo de erro.
   */
  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }
}
