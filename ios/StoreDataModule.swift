//
//  StoreDataModule.swift
//  gooddriver
//
//  Created by mac on 15/06/22.
//

import Foundation
import CoreLocation
import CoreMotion
@objc (SaveLocationToCoreData)
class SaveLocationToCoreData : NSObject{
  var locationManager = CLLocationManager()
  let manager = CMMotionManager()
  var locationsArr = [CLLocation]()
  var accArrr = [CMAccelerometerData]()
  var token = ""
  var userID = ""
  var tripID = ""
  var countDown = 120
  var timer = Timer()
  let BaseURL = "https://qa.gooddriver.co.uk/api/"
  
  
  @objc func askForPermission(){
    locationManager.requestAlwaysAuthorization()
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
    locationManager.allowsBackgroundLocationUpdates = true
  }
  @objc func getLocationUpdate(_ token:String,userID : String) {
    locationManager.requestAlwaysAuthorization()
    locationManager.delegate = self
    locationManager.desiredAccuracy = kCLLocationAccuracyBestForNavigation
    locationManager.allowsBackgroundLocationUpdates = true
    locationManager.startUpdatingLocation()
    locationManager.startMonitoringSignificantLocationChanges()
    UserDefaults.standard.removeObject(forKey: "SavedStringArray")
    tripID = "\(userID)_\(getCurrentMillis(date: Date()))_\(UIDevice.current.identifierForVendor!.uuidString)"
    self.token = token
    self.userID = userID
    let decoded  = UserDefaults.standard.object(forKey: "SavedStringArray") as? Data
  
    if let decodedTeams = try? NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(decoded ?? Data()) as? [CLLocation]{
   // return decodedTeams
    }
   
  //  return []
    // startGettingData()
  }
  @objc func stopIosService(){
    self.locationManager.stopUpdatingLocation()
  }
  @objc static func requiresMainQueueSetup() -> Bool{
   return true
  }
  
  @objc func exportToConstants() -> [String:Any]{
    return ["InitialState" : 0]
  }
}
extension SaveLocationToCoreData : CLLocationManagerDelegate{
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
           if (status == CLAuthorizationStatus.authorizedAlways) {
          //     self.setUpGeofenceForJob()
           }
       }

       func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
         //  alertUserOnArrival(region: region)
       }
       func locationManager(_ manager: CLLocationManager, didExitRegion region: CLRegion) {
          // alertUserOnLeaving(region: region)
       }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        self.locationsArr.append(locations[0])
        print(locations[0])

        let defaults = UserDefaults.standard
      let encoded =  try? NSKeyedArchiver.archivedData(withRootObject: locationsArr, requiringSecureCoding: false)
        defaults.removeObject(forKey: "SavedStringArray")
        defaults.set(encoded, forKey: "SavedStringArray")
       // self.tblView.reloadData()
//
         
        // Create a CMMotionManager instance
        
      self.manager.startAccelerometerUpdates()
        // Read the most recent accelerometer value
      if let accelerometerData = self.manager.accelerometerData {
        print(accelerometerData)
      }
      if ((locations.first?.speed ?? 0) * 2.23694) >= 5 && tripID != ""{
        self.countDown = 120
        self.timer.invalidate()
        if locationsArr.count >= 25{
            var accStringArr : [String] = []
            var locStringArr : [String] = []
          let dateFormat = DateFormatter()
          dateFormat.dateFormat = "YYYYMMddhhmmss"
            for acc in accArrr{
              let date1 = Date(timeIntervalSince1970: acc.timestamp)
              accStringArr.append("\(dateFormat.string(from: date1))|\(acc.acceleration.x)|\(acc.acceleration.y)|\(acc.acceleration.z)")
            }
            for loc in locationsArr {
              locStringArr.append("\(dateFormat.string(from: loc.timestamp))|\(loc.coordinate.longitude)|\(loc.coordinate.latitude)|\(loc.altitude)|\(loc.speedAccuracy)|\(loc.speed)")
            }
            
            let params : [String:Any] = ["deviceId":UIDevice.current.identifierForVendor!.uuidString,"locData":locStringArr,"accelerometerData":accStringArr,"tripId": tripID,"userId": "\(userID)"]
            executeServiceWithURL(urlString: "\(BaseURL)device/trip", postParameters: params as NSDictionary) { json, taskError in
                self.accArrr.removeAll()
                self.locationsArr.removeAll()
                UserDefaults.standard.removeObject(forKey: "AccelarometerData")
                UserDefaults.standard.removeObject(forKey: "SavedStringArray")
            }
        }
      }else if ((locations.first?.speed ?? 0) * 2.23694) >= 5 && tripID == ""{
        self.countDown = 120
        self.timer.invalidate()
        let dateFormat = DateFormatter()
        dateFormat.dateFormat = "YYYYMMddhhmmss"
        tripID = "\(userID)_\(getCurrentMillis(date: Date()))_\(UIDevice.current.identifierForVendor!.uuidString)"
        if locationsArr.count >= 25{
            var accStringArr : [String] = []
            var locStringArr : [String] = []
            for acc in accArrr{
              let date1 = Date(timeIntervalSince1970: acc.timestamp)
              accStringArr.append("\(dateFormat.string(from: date1 ))|\(acc.acceleration.x)|\(acc.acceleration.y)|\(acc.acceleration.z)")
            }
            for loc in locationsArr {
              
              locStringArr.append("\(dateFormat.string(from: loc.timestamp))|\(loc.coordinate.longitude)|\(loc.coordinate.latitude)|\(loc.altitude)|\(loc.speedAccuracy)|\(loc.speed)")
            }
            
            let params : [String:Any] = ["deviceId":UIDevice.current.identifierForVendor!.uuidString,"locData":locStringArr,"accelerometerData":accStringArr,"tripId": tripID,"userId": "\(userID)"]
            executeServiceWithURL(urlString: "\(BaseURL)device/trip", postParameters: params as NSDictionary) { json, taskError in
                self.accArrr.removeAll()
                self.locationsArr.removeAll()
                UserDefaults.standard.removeObject(forKey: "AccelarometerData")
                UserDefaults.standard.removeObject(forKey: "SavedStringArray")
            }
        }
      }else if ((locations.first?.speed ?? 0) * 2.23694) <= 0.0 {
        self.timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { (Timer) in
          if self.countDown > 0 {
                  print ("\(self.countDown) seconds")
                  self.countDown -= 1
          
              } else {
                self.tripID = ""
                self.locationsArr.removeAll()
                self.accArrr.removeAll()
                  Timer.invalidate()
              }
          }
      }else if countDown == 0{
        self.tripID = ""
        self.locationsArr.removeAll()
        self.accArrr.removeAll()
        
      }
    //  let tripID = "\(userID)_\(getCurrentMillis(date: Date()))_\(UIDevice.current.identifierForVendor!.uuidString)"

    }
  
  func getCurrentMillis(date : Date)->Int64{
      return  Int64(date.timeIntervalSince1970 * 1000)
  }

}

//MARK: - CallAPi to save Data
extension SaveLocationToCoreData{
  func executeServiceWithURL(urlString:String,postParameters:NSDictionary?,callback:@escaping (_ json:NSDictionary?,_ taskError:NSError?)->Void) {
    var jsonStrings:String?
    print("URL -: \(urlString)")
    
    do {
      
      if let param = postParameters  {
        print("Parameters -: \(param)")
        let json = try JSONSerialization.data(withJSONObject: param, options: JSONSerialization.WritingOptions.prettyPrinted)
        jsonStrings  = String(data: json,encoding: String.Encoding.utf8)!
      }
      
    } catch let error as NSError {
      print("Error : - \(error.localizedDescription)")
    }
    
    let sessionConfiguration = URLSessionConfiguration.default
    let session = URLSession(configuration: sessionConfiguration)
    
    let url = NSURL(string: urlString)
    
    let request = NSMutableURLRequest(url: url! as URL)
    request.httpMethod = "POST"
    request.httpBody = jsonStrings?.data(using: String.Encoding.utf8)
    
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    request.addValue(token, forHTTPHeaderField: "token")
    
    //            request.addValue(userDefault.value(forKey: APIAUTH.API_VALUE) as! String, forHTTPHeaderField:userDefault.value(forKey: APIAUTH.API_KEY) as! String)
    
    let dataTask = session.dataTask(with: request as URLRequest) { (taskData, taskResponse, taskError) in
      
      DispatchQueue.main.async {
        
        do {
          
          let json = try JSONSerialization.jsonObject(with: taskData!, options: .mutableLeaves) as? NSDictionary
          print("JSON :- \(json!)")
          callback(json!, nil)
          
        } catch let error as NSError {
          print("Error :- \(error.localizedDescription)")
          callback(nil, error)
        }
      }
    }
    dataTask.resume()
  }
}
