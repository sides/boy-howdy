import FormalCommandContext from '../FormalCommandContext'

export default interface IMutator<T> {
  /**
   * Mutates an argument in a request.
   */
  mutate(context: FormalCommandContext, arg: string): Promise<T>;
}
