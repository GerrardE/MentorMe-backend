/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email, id, fullName
  } = user;
  return {
    id, fullName, email, token,
  };
};

export default userExtractor;
