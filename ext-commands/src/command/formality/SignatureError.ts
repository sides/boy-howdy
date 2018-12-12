import Signature, { ArgSignature } from './Signature'

export default class SignatureError extends Error {
  /**
   * The arguments that the signature had a problem with.
   */
  public args: string[];

  /**
   * The argument index that caused the problem.
   */
  public index: number;

  constructor(message: string, args: string[], index?: number) {
    super(message);
    this.args = args;
    this.index = index;
  }

  public toString() {
    const msg = [];

    for (let i = 0; i < this.args.length; i++) {
      msg.push(this.index === i ? `->${this.args[i]}<-` : this.args[i]);
    }

    return msg.join(' ');
  }
}
