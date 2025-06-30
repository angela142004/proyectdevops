import { TextEncoder, TextDecoder } from "util";
import dotenv from "dotenv";
import fetchMock from "jest-fetch-mock";

dotenv.config();

// Soporte para fetch en los tests
fetchMock.enableMocks();

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}
