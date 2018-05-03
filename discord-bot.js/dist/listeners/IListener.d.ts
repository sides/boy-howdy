import Client from '../bot/Client';
export default interface IListener {
    subscribe(client: Client): any;
}
