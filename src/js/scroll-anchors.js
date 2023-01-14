
//  TODO: check if maximum page scroll has been exceeded and scroll tot hat point instead of trying to scroll past it.

// TODO: Simplify the easing setup. Perhaps use them as an optional import to keep main lib small.

const smoothScroll = new ScrollToAnchor({
  offset: 70,
  duration: 1000,
});


console.log('Index.js file 😎');

function ScrollToAnchor({offset = 0, duration = 800} = {}) {

    this.offset = offset;
    this.duration = duration;
  
    /* 
    Easing functions
    */
   const easing = {
    inOutQuad: t => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    inOutCubic: t => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    inOutQuart: t => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    inOutQuint: t => {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
  };
  
    
    const allLinks = () => Array.prototype.slice.call(document.getElementsByTagName('a'));
  
    const hasHash = link => (link.href && link.href.indexOf('#')) != -1;
  
    const hashLinks = allLinks().filter(link => hasHash(link) );
  
    const isSamePage = link => (link.pathname == window.location.pathname) || ('/' + link.pathname == window.location.pathname) && (link.search == location.search);
  
    const samePageLinks = hashLinks.filter(link => isSamePage(link));
  
    const scrollTo = (el) => {
      const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  
      const targetID = el.getAttribute('href');
      const targetAnchor = document.querySelector(targetID);
  
      const customOffset = targetAnchor.getAttribute('data-anchor-offset');
  
      offset = customOffset ? customOffset : this.offset;
      
      const anchorTop = distanceToTop(targetAnchor);
  
      const pageCurrentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
      const from = pageCurrentScroll;
      const to = pageCurrentScroll + anchorTop - offset;
  
      // flags for animation loop
      let stop = false;
      let start = null;
      let end = null;
  
      const startAnim = time => {
        start = time;
        end = start + duration;
        nextFrame(time);
      };
    
      const nextFrame = time => {
        if (stop) {
          document.documentElement.scrollTop = to;
          targetAnchor.focus();
          window.history.pushState('', '', targetID);
          return;
        }
        if (from == to || time - start >= duration) stop = true;
        const progress = (time - start) / duration;
        const val = easing.inOutQuart(progress);
        const nextPosition = (from + (to - from) * val);
        document.documentElement.scrollTop = nextPosition;
        requestAnimationFrame(nextFrame);
      };
    
      requestAnimationFrame(startAnim);
    };
  
    // deferred click listener on the body
    document.addEventListener('click', e => {
      const validLink = samePageLinks.filter(link => e.target === link)[0];
      if(validLink) {
        e.preventDefault();
        scrollTo(validLink);
      }
    });
  
  };
  
