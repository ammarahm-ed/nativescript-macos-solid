#ifndef RUNTIME_H
#define RUNTIME_H

#include <hermes/hermes.h>
#include <hermes/hermes_api.h>
#include <jsi/threadsafe.h>

#include "Require.h"

namespace charon {

class Runtime {
public:
  Runtime(std::string &mainPath);

  napi_value evaluateModule(std::string &spec);
  int executeJS(const char *sourceFile);
  int executeBytecode(const uint8_t *data, size_t size);

  bool eventLoopStep();
  void addEventLoopToRunLoop(bool exitOnEmpty = false);
  void runRunLoop();

  std::unique_ptr<facebook::jsi::ThreadSafeRuntime> threadSafeRuntime;
  facebook::hermes::HermesRuntime* runtime;
  napi_env env;
  std::string mainPath;
  Require *require;
};

} // namespace charon

#endif // RUNTIME_H
