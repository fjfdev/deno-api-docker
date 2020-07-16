export const getInfo = ({ response }: { response: any }) => {
  response.body = {
    msg: "Welcome to movies API built with Deno & Oak",
    endpoints: [
      {
        method: "GET",
        pathname: "/api/movies",
      },
      {
        method: "GET",
        pathname: "/api/movies/:id",
      },
    ],
  };
};
