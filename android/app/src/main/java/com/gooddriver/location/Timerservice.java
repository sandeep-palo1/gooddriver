package com.gooddriver.location;

import android.app.IntentService;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import android.location.LocationManager;
import android.os.Build;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

/**
 * An {@link IntentService} subclass for handling asynchronous task requests in
 * a service on a separate handler thread.
 * <p>
 * <p>
 * TODO: Customize class - update intent actions, extra parameters and static
 * helper methods.
 */
public class Timerservice extends BroadcastReceiver {
    public static final int REQUEST_CODE = 12345;
    Context mContext;
    public static final String ACTION = "com.codepath.example.servicesdemo.alarm";

    // Triggered by the Alarm periodically (starts the service to run task)
    @Override
    public void onReceive(Context context, Intent intent) {


        Intent i = new Intent(context, GPSTracker.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            context.startForegroundService(i);
            ContextCompat.startForegroundService(context, i);
//            context.startForegroundService(new Intent(context, GPSTracker.class));
        }else {
            context.startService(i);
        }
    }
}