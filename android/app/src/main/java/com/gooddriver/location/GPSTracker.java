package com.gooddriver.location;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.room.Room;
import androidx.room.util.StringUtil;

import com.facebook.react.bridge.Callback;
import com.gooddriver.ConstantUtil;
import com.gooddriver.ScreenReceiver;
import com.gooddriver.client_server.ApiClient;
import com.gooddriver.client_server.ApiInterface;
import com.gooddriver.client_server.ApiRequest;
import com.gooddriver.client_server.OnServerResponse;
import com.gooddriver.database.AccelerometerEntity;
import com.gooddriver.model.AccelerateModel;
import com.gooddriver.model.LocationModel;
import com.google.android.gms.common.util.Strings;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.gooddriver.database.AppDatabase;
import com.gooddriver.database.LocationDao;
import com.gooddriver.database.LocationEntity;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Call;

public class GPSTracker extends Service implements LocationListener, SensorEventListener, OnServerResponse {
    public int counter = 0;
    boolean isGPSEnabled = false;

    // flag for network status
    boolean isNetworkEnabled = false;

    boolean canGetLocation = false;

    Location location; // location
    double latitude; // latitude
    double longitude; // longitude

    double Lastlatitude; // latitude
    double Lastlongitude; // longitude


    // The minimum distance to change Updates in meters
    private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 10; // 10 meters

    // The minimum time between updates in milliseconds
    private static final long MIN_TIME_BW_UPDATES = 1000 * 6; // 1 minute

    // Declaring a Location Manager
    protected LocationManager locationManager;
    private FusedLocationProviderClient fusedLocationClient;
    public static boolean isStartService = false;
    public static AppDatabase db;
    LocationDao locationDao;
    private SensorManager sensorManager;
    private Sensor sensor;
    public static String userId;
    String deviceId;
    NotificationManager manager;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddhhmmss");

    @Override
    public void onCreate() {
        super.onCreate();
        deviceId = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O)
            startMyOwnForeground();
        else
            startForeground(1, new Notification());
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private void startMyOwnForeground() {
        String NOTIFICATION_CHANNEL_ID = "com.gooddriver";
        String channelName = "Background Service";
        NotificationChannel chan = new NotificationChannel(NOTIFICATION_CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_NONE);
        chan.setLightColor(Color.BLUE);
        chan.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);

        manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        assert manager != null;

        manager.createNotificationChannel(chan);

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);
        Notification notification = notificationBuilder.setOngoing(true)
                .setContentTitle("App is running in background")
                .setPriority(NotificationManager.IMPORTANCE_MIN)
                .setCategory(Notification.CATEGORY_SERVICE)
                .build();
        startForeground(2022, notification);
    }

    public void stopListener() {
        Log.e("STOP", "Stop Service");
        manager.cancel(2022);
        locationManager.removeUpdates(this);
        locationManager = null;
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        getLocation();
        //Sensor for acceleration
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        BroadcastReceiver mReceiver = new ScreenReceiver();
        registerReceiver(mReceiver, filter);

        return START_STICKY;
    }

    private Timer timer, uploadTimer;
    private TimerTask timerTask, uploadTimerTask;
    private String tripId;
    private boolean isStartStore = false;
    private int pauseMinuteCount = 0;


    public  void initDatabase(){
        if (db == null) {
            db = Room.databaseBuilder(getApplicationContext(),
                    AppDatabase.class, ConstantUtil.DB_NAME).build();
        }

        if (locationDao == null) {
            locationDao = db.locationDao();
        }
    }

    public void uploadTimmer() {
        initDatabase();
        uploadTimer = new Timer();
        uploadTimerTask = new TimerTask() {
            @Override
            public void run() {
                if (locationDao.getCount() >= 1 && isNetworkEnabled) {
                    uploadRecordedData();
                }
            }
        };
        uploadTimer.schedule(uploadTimerTask, 1000 * 15, 1000 * 15);
    }

    public void startTimer() {
        timer = new Timer();
        timerTask = new TimerTask() {
            public void run() {
                Log.i("Count", "=========  " + (counter++));
                locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

                Criteria locationCritera = new Criteria();
                String providerName = locationManager.getBestProvider(locationCritera,
                        true);

                if (ActivityCompat.checkSelfPermission(GPSTracker.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(GPSTracker.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }

                if (providerName != null)
                    location = locationManager.getLastKnownLocation(LocationManager.PASSIVE_PROVIDER);

                // sensorManager.unregisterListener(accelerationListener);
                if (location != null) {
                    sensorManager.registerListener(GPSTracker.this, sensor, SensorManager.SENSOR_DELAY_NORMAL);
                    Log.i("Timmer location", "=========  " + location.getLatitude());

                    initDatabase();
                    try {
//                        if ((tripId == null || tripId.trim().isEmpty()) && isStartService) {
//
//                           // Looper.prepare();
//                           // Toast.makeText(getApplicationContext(), "Direct::"+location.getSpeed(), Toast.LENGTH_SHORT).show();
//                            tripId = userId + '_' + Calendar.getInstance().getTimeInMillis() + '_' + deviceId;
//                            isStartStore = true;
//                        }

                        //manage the logic of create tripID on 5mi/h  and destroy the trip on stop for 2minutes condition
                        if (((int) (location.getSpeed() * 2.24)) >= 5 && (tripId == null || tripId.isEmpty()) && isStartService) {

//                            Toast.makeText(getApplicationContext(), "Condition::"+location.getSpeed(), Toast.LENGTH_SHORT).show();
                            tripId = userId + '_' + Calendar.getInstance().getTimeInMillis() + '_' + deviceId;
                            isStartStore = true;
                        } else if (location.getSpeed() == 0 && tripId != null && !tripId.isEmpty()) {
                            pauseMinuteCount++;
                            if (pauseMinuteCount >= 120) { //120 second i.e 2min
                                tripId = "";
                                pauseMinuteCount = 0;
                                isStartStore = false;
                            }
                        } else if (tripId != null && !tripId.isEmpty()) {
                            pauseMinuteCount = 0;
                        }

                        if (isStartStore) {
                            LocationEntity locationEntity = new LocationEntity();
                            locationEntity.tripId = tripId;
                            locationEntity.latitude = location.getLatitude();
                            locationEntity.longitude = location.getLongitude();
                            locationEntity.altitude = location.getAltitude();
                            locationEntity.accuracy = location.getAccuracy();
                            locationEntity.speed = location.getSpeed();

                            locationEntity.timestamp = dateFormat.format(new Date()); //String.valueOf(System.currentTimeMillis());

                            locationDao.insertAll(locationEntity);
//                            Toast.makeText(getApplicationContext(), "Condition isStartStore" + location.getSpeed(), Toast.LENGTH_SHORT).show();
                        }

                    } catch (Exception e) {
                        Log.e("Store data exception::", e.getMessage());
                    }
                } else {

                }
            }
        };
        timer.schedule(timerTask, 1000, 1000); //
    }

    //Upload trip on server
    public void uploadRecordedData() {
        if (db == null) {
            db = Room.databaseBuilder(this,
                    AppDatabase.class, ConstantUtil.DB_NAME).build();
        }
        if (locationDao == null) {
            locationDao = db.locationDao();
        }
        try {
            List<LocationEntity> value = locationDao.getAll();
            List<AccelerometerEntity> valueAccelerometer = locationDao.getAllAccelerate();

            JSONArray jsArrayLocation = new JSONArray();
            JSONArray accelerometerArray = new JSONArray();

            int iterationSize = value.size();
            if (value.size() > valueAccelerometer.size()) {
                iterationSize = valueAccelerometer.size();
            }
            for (int i = 0; i < iterationSize; i++) {
                Gson gson = new Gson();
                String json = gson.toJson(value.get(i));
//                JSONObject jsonObject = new JSONObject(json);
                //jsArray.put(jsonObject);

                LocationModel locationModel = new GsonBuilder().create().fromJson(json, LocationModel.class);
                String locationRaw = locationModel.timestamp + '|' + locationModel.longitude + '|' + locationModel.latitude + '|' + locationModel.altitude + '|' + locationModel.accuracy + '|' + locationModel.speed;

                String jsonAccelerate = gson.toJson(valueAccelerometer.get(i));
                AccelerateModel accelerateModel = new GsonBuilder().create().fromJson(jsonAccelerate, AccelerateModel.class);
                String accelerateRaw = accelerateModel.timestamp + '|' + accelerateModel.xAccelerate + '|' + accelerateModel.yAccelerate + '|' + accelerateModel.zAccelerate;
                jsArrayLocation.put(locationRaw);
                accelerometerArray.put(accelerateRaw);

                Log.e("Data", "Datalog");
            }


            JSONObject paramRequest = new JSONObject();
            paramRequest.put("deviceId", deviceId);
            paramRequest.put("locData", jsArrayLocation);
            paramRequest.put("accelerometerData", accelerometerArray);
            paramRequest.put("userId", userId);
            paramRequest.put("tripId", value.get(0).tripId);

            Log.e("Data", "Datalog");
            removeRow(value, valueAccelerometer);

            JsonObject jsonObject = new Gson().fromJson(paramRequest.toString(), JsonObject.class);

//Calling API
            ApiInterface apiInterface = ApiClient.createService(ApiInterface.class, this);
            new ApiRequest(this).callNetworkM(apiInterface.uploadTrip(jsonObject));


        } catch (Exception e) {
            Log.e("Exception", "" + e.getMessage());
        }
    }

    //    Remove uploaded data from table
    private void removeRow(List<LocationEntity> valuesLocation, List<AccelerometerEntity> valueAccelerometer) {
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                for (LocationEntity value :
                        valuesLocation) {
                    locationDao.delete(value);
                }

                for (AccelerometerEntity accelerometerEntity :
                        valueAccelerometer) {
                    locationDao.deleteAccelerometer(accelerometerEntity);
                }
            }
        });
    }

    @Override
    public void onDestroy() {
        if (timer != null)
            timer.cancel();
        if (timerTask != null)
            timerTask.cancel();

        if (uploadTimer != null)
            uploadTimer.cancel();
        if (uploadTimerTask != null)
            uploadTimerTask.cancel();

        stopListener();
        super.onDestroy();
    }


    public Location getLocation() {
        try {
            locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

            Criteria locationCritera = new Criteria();
            String providerName = locationManager.getBestProvider(locationCritera,
                    true);

            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return null;
            }

            if (providerName != null)
                location = locationManager.getLastKnownLocation(providerName);

            // GPSTracker locationListener = new GPSTracker();

            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0,
                    0, this);

            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);
            locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, this::onLocationChanged);


            // getting GPS status
            isGPSEnabled = locationManager
                    .isProviderEnabled(LocationManager.GPS_PROVIDER);

            // getting network status
            isNetworkEnabled = locationManager
                    .isProviderEnabled(LocationManager.NETWORK_PROVIDER);
            if (!isGPSEnabled && !isNetworkEnabled) {
                // no network provider is enabled
            } else {
                if(timer == null)
                startTimer();
                if(uploadTimer==null)
                uploadTimmer();

                this.canGetLocation = true;
                // First get location from Network Provider

                if (isNetworkEnabled) {
                    locationManager.requestLocationUpdates(
                            LocationManager.NETWORK_PROVIDER,
                            MIN_TIME_BW_UPDATES,
                            MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                    Log.d("Network", "Network");
                    if (locationManager != null) {
                        location = locationManager
                                .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                        if (location != null) {
                            latitude = location.getLatitude();
                            longitude = location.getLongitude();
                            Log.i("location:::N", +latitude + " " + longitude);
//                            Toast.makeText(this, ""+location.getLatitude(), Toast.LENGTH_SHORT).show();
                            // Toast.makeText(getApplicationContext(),"LatLang is" +latitude+" "+longitude,Toast.LENGTH_LONG).show();
                        }
                    }
                }
                // if GPS Enabled get lat/long using GPS Services
                if (isGPSEnabled) {
                    if (location == null) {
                        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                                MIN_TIME_BW_UPDATES,
                                MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                        Log.i("GPS Enabled", "GPS Enabled");
                        if (locationManager != null) {
                            location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                            if (location != null) {
                                latitude = location.getLatitude();
                                longitude = location.getLongitude();
                                Log.i("location:::GPS", +latitude + " " + longitude);
                            }
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return location;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        Log.i("location:::CH", +location.getLatitude() + " " + location.getLongitude());

    }

    @Override
    public void onLocationChanged(@NonNull List<Location> locations) {

    }

    @Override
    public void onFlushComplete(int requestCode) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        Log.d("Provider Status", "" + status);
    }

    @Override
    public void onProviderEnabled(@NonNull String provider) {


        Log.d("Provider Status", provider);
    }

    @Override
    public void onProviderDisabled(@NonNull String provider) {

        Log.d("Provider ", provider);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        sensorManager.unregisterListener(this);
        final float alpha = 0.8f;
//gravity is calculated here
        float[] gravityV = new float[3];
        gravityV[0] = alpha * gravityV[0] + (1 - alpha) * event.values[0];
        gravityV[1] = alpha * gravityV[1] + (1 - alpha) * event.values[1];
        gravityV[2] = alpha * gravityV[2] + (1 - alpha) * event.values[2];
//acceleration retrieved from the event and the gravity is removed
        float x = event.values[0] - gravityV[0];
        float y = event.values[1] - gravityV[1];
        float z = event.values[2] - gravityV[2];

        if (isStartStore) {
            if (db == null) {
                db = Room.databaseBuilder(getApplicationContext(),
                        AppDatabase.class, ConstantUtil.DB_NAME).build();
            }

            if (locationDao == null) {
                locationDao = db.locationDao();
            }

            AccelerometerEntity accelerometerEntity = new AccelerometerEntity();
            accelerometerEntity.tripId = tripId;
            accelerometerEntity.x_accelerate = x;
            accelerometerEntity.y_accelerate = y;
            accelerometerEntity.z_accelerate = z;
            accelerometerEntity.timestamp = dateFormat.format(new Date()); //String.valueOf(System.currentTimeMillis());
            AsyncTask.execute(() ->
                    {
                        locationDao.insertAll(accelerometerEntity);
                    }
            );
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }

    @Override
    public void onSuccess(String s) {

    }

    @Override
    public void onError(String errorMessage) {

    }
}