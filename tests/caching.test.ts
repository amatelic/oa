import { describe, expect, test, vi } from "vitest";
import { oa } from "../src";

const config = {
  model: "qwen2.5-coder:7b",
  stream: true,
} as const;

describe("Check ollama caching", () => {
  test("create that we don't do the same ollama requst two times", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("Ollama is running"),
      } as any),
    );

    const prompt1 = await oa({
      ...config,
      stream: false,
    });
    const prompt2 = await oa({
      ...config,
      stream: false,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    mockFetch.mockRestore();
  });
});
