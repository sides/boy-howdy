import Context from '../../route/Context'

export default interface IMutator<T = any> {
  /**
   * Mutates an argument for a command.
   */
  mutate(context: Context, arg: string): Promise<T>;
}
