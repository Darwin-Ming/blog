## **离线包通过打包命令产生的 RN 包（develop，production. 运行 App 时，直接使用 bundle 包，不需要再启动本地服务器**

## React Native 打包脚本 (chmod 744 script_name), 优化可以放到项目 package.json 的脚本中。

```
#!/bin/bash
npx react-native bundle\
                    --verbose\
                    --reset-cache \
                    --dev false\
                    --entry-file ./index.js\
                    --assets-dest ~/Desktop/resource\   // 需要手动复制到相应目录,
                                                        // /ios/
                                                        // ./android/app/src/main/res/
                    --bundle-output ~/Desktop/main.jsbundle\ // 需要手动复制到相应目录.
                                                             // ./ios/main.jsbundle
                                                             // ./android/app/src/main/assets/index.android.jsbundle
                    --platform ios // ios android
```

## React Native Android

### debug 运行离线包

1. 把离线包内容放到 src/main/assets/index.android.bundle.

    - 注意：
        - Android 是通过判断是否有 index.android.bundle 文件自动加载离线 bundle 包，还是从本地服务器加载 bundle 包。(与 iOS 不一样，iOS 是通过源代码 **宏** 来判断加载离线包，还是本地服务器包, 需要手动修改源代码。而 Android 不需要修改源代码)
        - Android Studio Project assets 在文件系统中对应目录可能不在 src/main 下。需要从项目反找到系统文件中对应的 assets 目录。

2. 需要把打包的资源放到 src/main/res 里。

#### 坑

-   项目在文件系统的 assets 目录没有映射到项目中的 assets 目录

-   iOS、Android 加载 bundle 的实现逻辑不一样 (先弄的 iOS，原以为逻辑是一样的，分析源码一上午)

## React Native iOS

1. 把离线包 main.bundle 放到项目中

2. 改

```objective-c
    - (NSURL _)sourceURLForBridge:(RCTBridge _)bridge {
      #if DEBUG
        return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
      #else
        return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
      #endif
      }
```

为

```objective-c
    - (NSURL _)sourceURLForBridge:(RCTBridge _)bridge {
        return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
      }
```

运行离线 bundle，无论是 debug 还是 release 都从 main.jsbundle 加载。
