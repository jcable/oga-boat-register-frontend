module.exports = {
  siteMetadata: {
    title: "boat-test",
  },
  flags: {
    QUERY_ON_DEMAND: true
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Register",
        fieldName: "register",
        url: 'https://api-oga.herokuapp.com/v1/graphql'
      },
    },
    'gatsby-plugin-material-ui'
  ],
};
