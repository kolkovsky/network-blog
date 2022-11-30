import { UserDatasource } from './databaseService';

export type ApolloContext = {
    dataSource: {
        users: UserDatasource
    }
}