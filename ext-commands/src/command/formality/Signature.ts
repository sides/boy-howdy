import IMutator from './IMutator'
import Context from '../../route/Context'
import SignatureError from './SignatureError'

export type SignatureOptions = {
  overflow?: IMutator | 'forward' | 'ignore' | 'error'
};

export type ArgSignature = {
  name: string,
  description?: string,
  required?: boolean,
  mutator?: IMutator<any>
};

export default class Signature {
  private _overflow: IMutator | string;
  private _argSignatures: ArgSignature[];
  private _numRequiredArgs: number;

  constructor(options: SignatureOptions, ...argSignatures: (string | ArgSignature)[]) {
    this._overflow = options.overflow || 'forward';
    this._numRequiredArgs = 0;

    this._argSignatures = argSignatures.map(signature => {
      if (signature instanceof Object) {
        if (signature.required) {
          this._numRequiredArgs++;
        }

        return signature;
      }

      if (signature.endsWith('?')) {
        return {
          name: signature.slice(0, -1),
          required: false
        };
      } else {
        this._numRequiredArgs++;

        return {
          name: signature,
          required: true
        }
      }
    });
  }

  /**
   * Validates and mutates string arguments to match the signature.
   *
   * @todo Actually mutate the args async? Currently impossible because
   *       `i` and `j` need to be synced during the loop.
   */
  public async process(context: Context, rawArgs: string[]) {
    const args = [];
    let j = 0;

    for (let i = 0; i < this._argSignatures.length; i++) {
      const signature = this._argSignatures[i];
      const arg = rawArgs[j];

      if (!arg) {
        continue;
      }

      if (signature.mutator) {
        const handleMutationError = signature.required
          ? err => { throw new SignatureError(err, rawArgs, j); }
          : err => { };

        const mutatedArg = await signature.mutator.mutate(context, arg)
          .catch(handleMutationError);

        if (mutatedArg !== undefined) {
          args.push(mutatedArg);
          j++;
        }
      } else {
        args.push(arg);
        j++;
      }
    }

    if (args.length < this._numRequiredArgs) {
      throw new SignatureError('Not enough arguments for signature', rawArgs);
    }

    if (rawArgs.length > j) {
      switch (this._overflow) {
        case 'error':
          throw new SignatureError('Too many arguments for signature', rawArgs);

        case 'forward':
          args.push(...rawArgs.slice(j));
          break;

        case 'ignore':
          break;

        default:
          const mutator = this._overflow as IMutator;

          for (j; j < rawArgs.length; j++) {
            args.push(await mutator.mutate(context, rawArgs[j]).catch(err => { }));
          }
      }
    }

    return args;
  }
}
