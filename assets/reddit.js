//==============================================================================
// ■ Reddit (web-tools/assets/reddit.js)
//   by Ambratolm (github.com/Ambratolm)
//------------------------------------------------------------------------------
//     Simple wrapper utility for Reddit's public readonly API.
//==============================================================================

const reddit = {
  async search(criteria = {}) {
    for (const key in criteria) {
      if (!criteria[key] || typeof criteria[key] !== "string") criteria[key] = "";
      else criteria[key] = criteria[key].trim().toLowerCase();
    }

    const { keyword, author, subreddit, after, sort } = criteria;
    let baseUrl = "https://www.reddit.com";
    let query = ".json?";

    if (subreddit) baseUrl += `/r/${subreddit}`;
    else if (!keyword && !author) baseUrl += "/r/all";
    if (keyword || author) baseUrl += "/search";

    if (keyword || author) query += `q=${keyword}`;
    if (author) query += `+author:${author}`;
    if (subreddit) query += "&restrict_sr=1";
    if (after) query += `&after=${after}`;
    query += `&sort=${sort || 'new'}`;

    const url = baseUrl + query;
    const result = await (await fetch(url)).json();
    if (result) result.$url = url;
    return result;
  }
}
