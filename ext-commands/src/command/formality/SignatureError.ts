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
    let i = -1;

    return this.args.map(arg => {
      i++;

      return this.index === i
        ? `->${arg}<-`
        : arg;
    }).join(' ');
  }
}
