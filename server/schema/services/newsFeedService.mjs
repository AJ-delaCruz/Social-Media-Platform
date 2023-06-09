// partial function application
const getNewsFeedService = (getAllPostsService, getAllFriendsService) => async (userId) => {
  // retrieve user friends Ids
  const friendIds = await getAllFriendsService(userId);

  // include userId to  also retrieve their posts
  const userIds = [userId, ...friendIds];


  // create the newsfeed for user along with their own posts
  const newsFeed = await Promise.all(userIds.map(async (user) => {
    // getPosts is called for each friends in parallel using Promise.all
    const posts = await getAllPostsService(user);
    return posts;
  }));
  //   console.log(newsFeed);

  //   //sequential
  //   const newsFeed = [];

  //   for (let friend of friends) {
  //     const posts = await getPosts(friend);
  //     newsFeed.push(...posts);
  //   }

  // concatenating all the arrays within into a single array
  const newsfeedPosts = [].concat(...newsFeed);
  // sort the newsfeed posts by created at
  newsfeedPosts.sort((a, b) => b.createdAt - a.createdAt);

  return newsfeedPosts;
};

export default getNewsFeedService;
