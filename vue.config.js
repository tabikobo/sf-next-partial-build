const config = {
  configureWebpack: {
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"],
    },
    module: {
      rules: [
        // fixes https://github.com/graphql/graphql-js/issues/1272
        {
          test: /\.mjs$/,
          // include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};

module.exports = config;
