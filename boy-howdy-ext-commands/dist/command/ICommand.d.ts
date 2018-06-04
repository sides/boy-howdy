import Request from '../route/Request';
export default interface ICommand {
    handle(request: Request): void;
}
