//
//  main.m
//  Solid Desktop
//
//  Created by Team nStudio on 10/30/24.
//

#import <Cocoa/Cocoa.h>
#import <NativeScriptRuntime/Runtime.h>
#include <fstream>
#include <iostream>

using namespace charon;

std::string getBundlePath();

std::string getBytecodePathFromBundle();

int main(int argc, const char * argv[]) {
    std::string bundlePath = getBundlePath();
    std::string bytecodePath = getBytecodePathFromBundle();

    auto runtime = Runtime(bundlePath);

    // runtime.addEventLoopToRunLoop(true);

    std::ifstream file(bytecodePath, std::ios::binary);
    if (!file.is_open()) {
      std::cout << "Failed to open bytecode file" << std::endl;
      return 1;
    }

    file.seekg(0, std::ios::end);
    size_t size = file.tellg();
    file.seekg(0, std::ios::beg);

    std::vector<uint8_t> data(size);
    file.read((char *)data.data(), size);

    file.close();

    runtime.executeBytecode(data.data(), size);
    return 0;
}
