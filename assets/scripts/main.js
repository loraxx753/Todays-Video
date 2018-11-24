import './silence.js';

(async () => {
  const url = window.source
  const videos = await fetch(url).then(resp => resp.json() );


  if(document.querySelector('json-debug')) document.querySelector('json-debug').innerHTML = `<details>
    <summary>Current JSON Object</summary>
    <pre><code>
      ${JSON.stringify(videos, null, 2)}
    </code></pre>
  </details>`

  const current_video = videos.shift()

  const todaysVideo = document.createElement('todays-video')
  todaysVideo.innerHTML = `
    <h2>${current_video.title}</h2>
    <p><small><i>${current_video.date}</i></small></p>
    <iframe width="560" height="315" style="width: 560px; height: 315; max-width: 90vw" src="https://www.youtube.com/embed/${current_video.youtube_id}?controls=1"
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `
    document.querySelector('main').appendChild(todaysVideo)


  
//   for(let video of videos) {
//       console.log(video)
// //     if(key.match(/[a-z\-]+/i)) {
// //       const json_elements = document.querySelectorAll(`json-${key}`)
// //       for(let json_element of json_elements) {
// //         buildElementFromValue(json[key], json_element)
// //       }  
// //     }
//   }


})()
