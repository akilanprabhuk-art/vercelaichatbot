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
// ... inside your customProvider configuration
  : customProvider({
      languageModels: {
        // Add "as any" to bypass the version mismatch check
        "chat-model": openai("gpt-4o-mini") as any,
        "chat-model-reasoning": wrapLanguageModel({
          model: openai("o1-mini") as any,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }) as any,
        "title-model": openai("gpt-4o-mini") as any,
        "artifact-model": openai("gpt-4o") as any,
      },
    });
