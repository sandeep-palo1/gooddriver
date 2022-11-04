//
//  SaveDataTpCoredata.m
//  gooddriver
//
//  Created by mac on 15/06/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SaveLocationToCoreData,NSObject)
RCT_EXTERN_METHOD(getLocationUpdate:(NSString*)token userID: (NSString)userID)
RCT_EXTERN_METHOD(stopIosService)
RCT_EXTERN_METHOD(askForPermission)
@end
  
