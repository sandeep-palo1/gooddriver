package com.gooddriver;

import android.content.Context;
import android.location.Location;
import android.widget.Toast;

public class AppUtil {
    final   static  double EARTH_RADIUS = 6371000;
    private void getspeed(Location location, double oldLat, double oldLon, double curTime, Context context){
        double newTime= System.currentTimeMillis();
        double newLat = location.getLatitude();
        double newLon = location.getLongitude();
        if(location.hasSpeed()){
            float speed = location.getSpeed();
            Toast.makeText(context,"SPEED : "+String.valueOf(speed)+"m/s",Toast.LENGTH_SHORT).show();
        } else {
            double distance = calculationBydistance(newLat,newLon,oldLat,oldLon);
            double timeDifferent = newTime - curTime;
            double speed = distance/timeDifferent;
            curTime = newTime;
            oldLat = newLat;
            oldLon = newLon;
            Toast.makeText(context,"SPEED 2 : "+String.valueOf(speed)+"m/s",Toast.LENGTH_SHORT).show(); //meter/second
        }
    }

    public double calculationBydistance(double lat1, double lon1, double lat2, double lon2){
        double radius = EARTH_RADIUS;
        double dLat = Math.toRadians(lat2-lat1);
        double dLon = Math.toRadians(lon2-lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        double c = 2 * Math.asin(Math.sqrt(a));
        return radius * c;
    }

    public static double getSpeedNew(Location currentLocation, Location oldLocation)
    {
        double newLat = currentLocation.getLatitude();
        double newLon = currentLocation.getLongitude();

        double oldLat = oldLocation.getLatitude();
        double oldLon = oldLocation.getLongitude();

        if(currentLocation.hasSpeed()){
            return currentLocation.getSpeed();
        } else {
            double radius = EARTH_RADIUS;
            double dLat = Math.toRadians(newLat-oldLat);
            double dLon = Math.toRadians(newLon-oldLon);
            double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(Math.toRadians(newLat)) * Math.cos(Math.toRadians(oldLat)) *
                            Math.sin(dLon/2) * Math.sin(dLon/2);
            double c = 2 * Math.asin(Math.sqrt(a));
            double distance =  Math.round(radius * c);

            double timeDifferent = currentLocation.getTime() - oldLocation.getTime();
            return distance/timeDifferent;
        }
    }
}
