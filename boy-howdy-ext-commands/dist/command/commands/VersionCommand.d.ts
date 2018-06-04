import Request from '../../route/Request';
import FormalCommand from '../FormalCommand';
export default class VersionCommand extends FormalCommand {
    name: string;
    run(request: Request): void;
}
