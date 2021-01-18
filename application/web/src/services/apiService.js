const { REACT_APP_API_URL } = process.env

export function getTweetsResults(tweets) {

  console.log(tweets)
  return fetch(`${REACT_APP_API_URL}predictions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tweets: tweets.slice(0,10).map(el => ({ "id": el.id, "text": el.content }))
    })
  })
    .then(data => data.json())
}