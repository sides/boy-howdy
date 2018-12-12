import Request from '../route/Request'

export default interface ICommand {
  /**
   * Handles the command.
   */
  handle(request: Request): void;
}
