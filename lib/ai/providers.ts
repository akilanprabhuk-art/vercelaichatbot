import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// Initialize the direct OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper to bridge the gap between AI SDK V3 models and V2 expectations.
 * This fixes the "Type 'LanguageModelV3' is not assignable to type 'LanguageModelV2'" error.
 */
function wrapV3toV2(model: any): any {
  return new Proxy(model, {
    get(target, prop) {
      if (prop === 'specificationVersion') return 'v2';
      return target[prop as keyof typeof target];
    },
  });
}

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": wrapV3toV2(openai("gpt-4o-mini")),
        "chat-model-reasoning": wrapLanguageModel({
          model: wrapV3toV2(openai("o1-mini")),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }) as any,
        "title-model": wrapV3toV2(openai("gpt-4o-mini")),
        "artifact-model": wrapV3toV2(openai("gpt-4o")),
      },
    });
