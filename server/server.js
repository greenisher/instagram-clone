    // server/server.js

    let express = require("express");
    let graphqlHTTP = require("express-graphql");
    let { buildSchema } = require("graphql");
    let cors = require("cors");

    let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);
    // Maps id to User object
    let userslist = {
        a: {
          id: "a",
          nickname: "DefaultUser",
          avatar: "defaultIcon"
        },
};
let postslist = {
  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Caption1",
      image: "ImageOne"
    },
    b: {
      id: "b",
      user: userslist["a"],
      caption: "Caption2",
      image:
        "ImageTwo"
    },
    c: {
      id: "c",
      user: userslist["a"],
      caption: "Caption3",
      image: "ImageThree"
    },
    d: {
      id: "d",
      user: userslist["a"],
      caption: "Caption4",
      image: "ImageFour"
    }
  }
};

let root = {
    user: function({ id }) {
      return userslist[id];
    },
    post: function({ user_id , post_id }) {
      return postslist[user_id][post_id];
    },
    posts: function({ user_id }){
      return Object.values(postslist[user_id]);
    }
  };

  let app = express();
    app.use(cors());
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );
    // set application port
    app.listen(4000);