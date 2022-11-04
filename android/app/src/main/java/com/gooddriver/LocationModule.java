package com.gooddriver;

import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.telecom.Call;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.room.Room;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.gooddriver.client_server.ApiClient;
import com.gooddriver.database.AccelerometerEntity;
import com.google.gson.Gson;
import com.gooddriver.database.AppDatabase;
import com.gooddriver.database.LocationDao;
import com.gooddriver.database.LocationEntity;
import com.gooddriver.location.GPSTracker;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

public class LocationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public AppDatabase db;
    LocationDao locationDao;

    public LocationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void show() {
        Toast.makeText(reactContext, "hi from android", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void getDeviceId(Promise promise) {
        try {
            String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
            promise.resolve(id);
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    @ReactMethod
    public void stopService() {
        Log.e("STOP SERVICE", "Stop Service");
        Intent myService = new Intent(reactContext, GPSTracker.class);
        reactContext.stopService(myService);

        GPSTracker.isStartService = false;
    }

    @ReactMethod
    public void userId(String userId, String userToken){
        GPSTracker.userId = userId;
        ApiClient.token = userToken;

    }

    @ReactMethod
    public void startService() {
        GPSTracker.isStartService = true;
        Intent i = new Intent(reactContext, GPSTracker.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            context.startForegroundService(i);
//            ContextCompat.startForegroundService(context, i);
            reactContext.startForegroundService(i);
        } else {
            reactContext.startService(i);
        }
    }

    @ReactMethod
    public void fetchLocation(String tripId, Callback callback) {
        if (db == null) {
            db = Room.databaseBuilder(reactContext,
                    AppDatabase.class, ConstantUtil.DB_NAME).build();
        }
        if (locationDao == null) {
            locationDao = db.locationDao();
        }
        try {
            List<LocationEntity> value = locationDao.getAll();
            List<AccelerometerEntity> valueAccelerometer = locationDao.getAllAccelerate();

            JSONArray jsArray = new JSONArray();
            for (int i = 0; i < value.size(); i++) {
                Gson gson = new Gson();
                String json = gson.toJson(value.get(i));
                JSONObject jsonObject = new JSONObject(json);
                jsArray.put(jsonObject);
            }

             JSONArray accelerometerArray = new JSONArray();
            for (int i = 0; i < valueAccelerometer.size(); i++) {
                Gson gson = new Gson();
                String json = gson.toJson(valueAccelerometer.get(i));
                JSONObject jsonObject = new JSONObject(json);
                accelerometerArray.put(jsonObject);
            }
            callback.invoke(null, convertJsonToArray(jsArray),  convertJsonToArray(accelerometerArray));
        } catch (Exception e) {
            callback.invoke("Error" + e.getMessage(), null);
        }
    }


    private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String) {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }

    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    @NonNull
    @Override
    public String getName() {
        return "LOC";
    }
}
