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
  const polyfills = {
    "css-variables" : "https://unpkg.com/css-vars-ponyfill@1",
    "css-polyfills" : "https://rawgit.com/FremyCompany/css-grid-polyfill/master/bin/css-polyfills.js",
    "custom-elements" : "https://unpkg.com/@webcomponents/custom-elements",
    "regenerator-runtime" : "https://cdn.jsdelivr.net/npm/regenerator-runtime@0.12.1/runtime.js",
    "main.js" : "assets/scripts/legacy/main.js",
  }


  const thisIsALegacyBrowser = !('Promise' in window);
  
  window.browser = {
    legacy: thisIsALegacyBrowser,
  }

  if (thisIsALegacyBrowser) {
    addScript(polyfills['css-variables'], function() {
        cssVars();
    });
    addScript(polyfills['css-polyfills'])
    addScript(polyfills['custom-elements'], function() {
      addScript(polyfills['regenerator-runtime'], function() {
        addScript(polyfills['main.js'])
      })        
    })
  } else { // this is a modern browser
    addScript('assets/scripts/main.js', function() {
    }, { type: "module" })
  }

  if ('serviceWorker' in navigator && false) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('assets/scripts/web-workers/sw.js')
        .then(reg => console.log('Service Worker is now registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })    
  }
})()
