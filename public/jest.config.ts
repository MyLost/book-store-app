import {Config} from "jest";

export default async (): Promise<Config> => {
  return {
    cache: false,
    verbose: true,
//   TODO: enable when test is fixed
//    detectLeaks: true,
    detectOpenHandles: true,
    errorOnDeprecated: true,
    globals: {
      TextEncoder: TextEncoder,
      TextDecoder: TextDecoder
    },
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/books-store',
  };
};
