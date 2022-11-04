#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
//
//- (void)applicationWillTerminate:(UIApplication *)application {
//
//}

- (void)applicationWillTerminate:(UIApplication *)application;

@end
