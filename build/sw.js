// /* eslint-disable no-restricted-globals */
// self.addEventListener("fetch", (event) => {
//   console.log("Hello");
//   if (event.request.url.includes("docs.google.com/gview")) {
//     event.respondWith(fetchAndRetry(event.request));
//   }
// });

// async function fetchAndRetry(request) {
//   let response;
//   while (true) {
//     response = await fetch(request);
//     console.log(response);
//     if (response.status !== 204) {
//       break;
//     }
//     console.log("Received 204, retrying...");
//     await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds before retrying
//   }
//   return response;
// }
