export const resolvers = {
  Query: {
    me: () => {
      return "Hi";
    },
    id: () => {
      return 1;
    },
  },
  Mutation: {
    // @ts-ignore
    register: async (_, args, context) => {
      const response = await context.dataSource.users.createUser(args);
      console.log(response, "[RESPONSE]");
      return {
        firstName: "",
      };
    },
    // @ts-ignore
    login: async (_, args, context) => {
      const response = await context.dataSource.users.getUserByEmail(
        args.request.email
      );
      const user = response.rows[0];
      return {
        id: user.user_id,
        firstName: user.firstname,
        lastName: user.lastname,
        nickname: user.nickcname,
        age: user.age,
        email: user.email,
        socials: [],
      };
    },
  },
};
