import { IWrite, IRead } from './index';

/**
 * IRepository<T>
 */
export interface IRepository<T> extends IWrite<T>, IRead<T> {

}
