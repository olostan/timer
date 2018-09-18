/**
 * Initialise and launch the windows
 * @see http://developer.chrome.com/apps/app.window.html
 */
function launch() {

  chrome.app.window.create('timer.html', {
      id: "mainwin",
      innerBounds: {
        top: 128,
        left: 128,
        width: 240,
        height: 110,

        minHeight: 110,
        maxHeight: 110,

        maxWidth: 240,
        minWidth: 240
      },
      frame: 'none',
      alwaysOnTop: true
    });
}

// @see http://developer.chrome.com/apps/app.runtime.html
chrome.app.runtime.onLaunched.addListener(launch);
