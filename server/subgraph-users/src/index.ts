import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import express from "express";

import { gql } from "graphql-tag";
import { readFileSync } from "fs";

import { resolvers } from "./resolver";
import { UserDatasource } from "./databaseService";

require("dotenv").config();

const typeDefs = gql(readFileSync("./users.graphql", "utf-8"));

const expressServer = express();

const startServer = async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
  });

  const { url } = await startStandaloneServer(server, {
    context: async (_params) => {
      return {
        dataSource: {
          users: UserDatasource.getInstance(),
        },
      };
    },
    listen: { port: Number(process.env.PORT) },
  });

  expressServer.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  console.log(
    `Apollo-server subgraph start on ${process.env.PORT} url: ${url}`
  );
};

startServer();
