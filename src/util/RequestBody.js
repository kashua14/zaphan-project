import { ACCESS_TOKEN } from "constants";

export default function request(options) {
  const header = new Headers({
    "Content-Type": "application/json",
  });

  const isEndPointClosed = options.isEndPointClosed ?? true;

  if (isEndPointClosed && localStorage.getItem(ACCESS_TOKEN)) {
    header.append("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);
  }

  const defaults = { headers: header, ...options };

  return fetch(defaults.url, defaults).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
}
