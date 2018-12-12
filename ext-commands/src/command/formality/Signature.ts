import IMutator from './IMutator'
import Context from '../../route/Context'
import SignatureError from './SignatureError'

export type ArgSignature = {
  /**
   * A descriptive name for the argument.
   */
  name: string,

  /**
   * A short description of what the argument is for.
   */
  description?: string,

  /**
   * A mutator for the argument.
   */
  mutator?: IMutator<any>

  /**
   * Whether or not the argument will be repeated. This only makes
   * sense for the last argument in a signature.
   */
  greedy?: boolean;
};

export default class Signature {
  private _argSignatures: ArgSignature[];

  constructor(...argSignatures: (string | ArgSignature)[]) {
    this._argSignatures = argSignatures.map(signature => {
      return !(signature instanceof Object)
        ? { name: signature }
        : signature;
    });
  }

  /**
   * Validates and mutates string arguments to match the signature.
   */
  public async process(context: Context, rawArgs: string[]) {
    const args = [];
    const mutations: Promise<any>[] = [];
    let wasGreedy = false;

    if (rawArgs.length < this._argSignatures.length) {
      throw new SignatureError('Not enough arguments for signature', rawArgs);
    }

    for (let i = 0; i < this._argSignatures.length; i++) {
      const argSignature = this._argSignatures[i];

      if (argSignature.greedy) {
        for (i; i < rawArgs.length; i++) {
          mutations.push(Signature._getArgumentMutation(argSignature, context, rawArgs, i)
            .then(mutatedArg => args[mutatedArg[0]] = mutatedArg[1]));
        }

        wasGreedy = true;

        break;
      }

      mutations.push(Signature._getArgumentMutation(argSignature, context, rawArgs, i)
        .then(mutatedArg => args[mutatedArg[0]] = mutatedArg[1]));
    }

    await Promise.all(mutations);

    if (!wasGreedy && rawArgs.length > this._argSignatures.length) {
      throw new SignatureError('Too many arguments for signature', rawArgs);
    }

    return args;
  }

  private static _getArgumentMutation(s: ArgSignature, ctx: Context, rawArgs: string[], index: number) {
    return s.mutator
      ? s.mutator.mutate(ctx, rawArgs[index])
          .then(mutatedArg => [index, mutatedArg])
          .catch(err => { throw new SignatureError(err, rawArgs, index); })
      : Promise.resolve([index, rawArgs[index]]);
  }
}
