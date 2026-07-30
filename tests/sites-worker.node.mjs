import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets directly", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/assets/game.js"),
    {
      ASSETS: {
        fetch: async (request) => {
          calls.push(new URL(request.url).pathname);
          return new Response("asset", { status: 200 });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/game.js"]);
});

test("falls back to the game shell for an unknown navigation route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/expedition?prototype=0.1", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          const isIndex = url.pathname === "/index.html";
          return new Response(isIndex ? "game" : "missing", {
            status: isIndex ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, [
    "/expedition?prototype=0.1",
    "/index.html",
  ]);
});

test("does not convert missing API or write requests into HTML", async () => {
  const requests = [
    new Request("https://example.test/api/missing", {
      headers: { accept: "application/json" },
    }),
    new Request("https://example.test/expedition", {
      method: "POST",
      headers: { accept: "text/html" },
    }),
  ];

  for (const request of requests) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required for Sites deployment", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));

  const hosting = JSON.parse(
    await readFile(
      new URL("../dist/.openai/hosting.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(
    hosting.project_id,
    "appgprj_6a6bd29243f88191a63835be637e9055",
  );
});
