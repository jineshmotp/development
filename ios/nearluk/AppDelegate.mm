#import "AppDelegate.h"
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyBhjq9RPUB2ACFkLW-vpdXTBjtFTD3s2Xk"];
  [FIRApp configure];
  self.moduleName = @"nearluk";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Add the deep linking handler method
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  NSString *urlString = [url absoluteString];

  // Parse the URL and handle it accordingly
  if ([urlString hasPrefix:@"nearlukapp://"]) {
    // For example, navigate to a specific view controller
    // Here, you can extract information from the URL and use it to navigate to a specific screen in your app.
    // For example:
    if ([url.host isEqualToString:@"specificpath"]) {
      // Handle the URL, e.g., navigate to a specific view controller
      // For React Native, you may want to send the URL to your JavaScript code
      [self sendDeepLinkToReactNative:urlString];
    }
    return YES;
  }

  return NO;
}

// Method to send the URL to React Native
- (void)sendDeepLinkToReactNative:(NSString *)urlString
{
  // Assuming you have a React Native event emitter setup to handle incoming URLs
  NSDictionary *payload = @{@"url": urlString};
  [[NSNotificationCenter defaultCenter] postNotificationName:@"DeepLinkReceived" object:self userInfo:payload];
}

@end