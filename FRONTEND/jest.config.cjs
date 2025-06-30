module.exports = {
  testEnvironment: "jsdom",

  // Cargar variables/env/mock antes de los tests
  setupFiles: ["<rootDir>/src/setupTests.js"],

  // Configurar testing-library/jest-dom después de inicializar
  setupFilesAfterEnv: ["@testing-library/jest-dom"],

  // Mapeo de módulos no JS (CSS, imágenes, etc.)
  moduleNameMapper: {
    "^swiper/css$": "<rootDir>/__mocks__/swiper-css-mock.js",
    "^swiper/css/.*$": "<rootDir>/__mocks__/swiper-css-mock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^react-markdown$": "<rootDir>/__mocks__/react-markdown.js",
  },

  // Asegura transformación de paquetes ESM
  transformIgnorePatterns: [
    "node_modules/(?!(swiper|react-markdown|@uiw/react-md-editor|@uiw/react-markdown-preview|@supabase|remark-.*|unified|bail|trough|vfile|mdast-util.*|micromark.*|hast-util.*|unist-util.*|property-information|comma-separated-tokens|estree-util-is-identifier-name|rehype-prism-plus|parse-numeric-range|refractor|cross-fetch|whatwg-fetch)/)",
  ],

  // Soporte para JSX, TSX y .mjs modernos
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },

  // Ubicación de archivos de prueba
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
