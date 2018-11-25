import './assets/scripts/main.js';

(async function() {
    document.addEventListener('silence', function() {
        document.querySelectorAll('video-item').forEach(element => {
            element.addEventListener('click', function(e) {
                const new_video = this.querySelector('img').getAttribute('youtube-video')
                const new_title = this.querySelector('[array-title]').textContent;
                const new_date = this.querySelector('[array-date]').textContent;
                const current_video = document.querySelector('#current-video')

                current_video.querySelector('[array-title]').textContent = new_title
                current_video.querySelector('[array-date]').textContent = new_date

                const iframe = current_video.querySelector('iframe');
                const iframe_clone = iframe.cloneNode(true)
                iframe_clone.src = new_video;
                iframe.parentElement.replaceChild(iframe_clone, iframe)
                let root = document.documentElement;
                root.style.setProperty('--sidebar-width', 0)    
            })
        })

        document.querySelector('.close-sidebar').addEventListener('click', function(e) {
            e.preventDefault();
            let root = document.documentElement;
            root.style.setProperty('--sidebar-width', 0)
        });
        document.querySelector('.open-sidebar').addEventListener('click', function(e) {
            e.preventDefault();
            let root = document.documentElement;
            root.style.setProperty('--sidebar-width', '80vw')
        });
    })


})()
