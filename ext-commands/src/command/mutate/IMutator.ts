import FormalCommandContext from '../FormalCommandContext'

export default interface IMutator<T> {
  /**
   * Mutates an argument for a command.
   */
  mutate(context: FormalCommandContext, arg: string): Promise<T>;
}
