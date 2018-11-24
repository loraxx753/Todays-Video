import './assets/scripts/main.js';

const script = document.createElement('script');

// A quick function to add <script> tags to the end of <body>
function addScript(src, callback, options) {
  callback = (callback) ? callback : new Function() 
  const scriptClone = script.cloneNode(true);
  scriptClone.setAttribute('src', src)
  for(var key in options) {
    scriptClone.setAttribute(key, options[key])
  }
  document.body.appendChild(scriptClone)
  scriptClone.onload = callback
} 

(function() {
    addScript('https://cdn.rawgit.com/showdownjs/showdown/1.9.0/dist/showdown.min.js')
})()
