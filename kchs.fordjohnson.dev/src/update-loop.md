# Update Loop

```js echo
const refreshIntervalSeconds = 10;

function main() {
  console.log("Hello World");
  updateTimestamps();
}

function updateTimestamps() {
  const now = new Date();
  document.getElementById("lastUpdated").innerText = now.toLocaleTimeString();
  startCountdown(refreshIntervalSeconds);
}

function startCountdown(seconds) {
  const countdownElement = document.getElementById("nextRefreshIn");
  let remaining = seconds;

  const countdownInterval = setInterval(() => {
    countdownElement.innerText = remaining + " seconds";
    remaining--;

    if (remaining < 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

window.onload = () => {
  main();

  setInterval(main, refreshIntervalSeconds * 1000);
};
```

<div>
    <p>Last updated: <span id="lastUpdated">Never</span></p>
    <p>Next refresh in: <span id="nextRefreshIn">Loading...</span></p>
</div>
