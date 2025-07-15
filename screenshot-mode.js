// Screenshot Mode Control for Admin Panel
// Copy and paste these commands in browser console

// Enable screenshot mode (shows sample data)
function enableScreenshotMode() {
  localStorage.setItem('screenshotMode', 'true');
}

// Disable screenshot mode (returns to normal API calls)
function disableScreenshotMode() {
  localStorage.removeItem('screenshotMode');
}

// Check current mode
function checkScreenshotMode() {
  const isEnabled = localStorage.getItem('screenshotMode') === 'true';
  return isEnabled;
}

// Quick enable
enableScreenshotMode(); 