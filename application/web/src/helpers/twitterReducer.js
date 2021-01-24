const initialState = {
  tweets: [],
  isRequestPending: false
};

const SET_TWEETS = "SET_TWEETS";
const UPDATE_TWEETS = "UPDATE_TWEETS";
const REMOVE_TWEETS = "REMOVE_TWEETS";
const SET_FULL_TWEETS = "SET_FULL_TWEETS";

const actions = {
  SET_TWEETS: SET_TWEETS,
  UPDATE_TWEETS: UPDATE_TWEETS,
  REMOVE_TWEETS: REMOVE_TWEETS,
  SET_FULL_TWEETS: SET_FULL_TWEETS,
};

function updateTweetWithEmotions(tweet, tweetsWithEmotions) {
  const matchingTweet = tweetsWithEmotions.find(el => el.id === tweet.id)
  if(matchingTweet != null) {
    return { ...matchingTweet, ...tweet }
  }
  return tweet
}

function reducer(state, action) {
  switch (action.type) {
    case SET_TWEETS:
      return { ...state, isRequestPending: true, tweets: action.data };
    case SET_FULL_TWEETS:
      return { ...state, isRequestPending: false, tweets: action.data };
    case UPDATE_TWEETS:
      return { ...state, isRequestPending: false, tweets: state.tweets.map(tweet => updateTweetWithEmotions(tweet, action.data)) };
    case REMOVE_TWEETS:
      return { ...state, tweets: [] };
    default:
      throw new Error();
  }
}

export { reducer, initialState, actions };
