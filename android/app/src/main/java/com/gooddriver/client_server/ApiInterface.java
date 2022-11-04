/*
 * 24/06/21, 9:55 AM
 * ApiInterface.java
 * ONKO
 *  Created by Shubham Lochan(Siya Tech) on 24/06/21, 9:55 AM
 * Copyright (c) 2021 ONKO all rights reserved
 *
 */

package com.gooddriver.client_server;

import com.google.gson.JsonObject;

import org.json.JSONObject;

import io.reactivex.Single;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiInterface {

    @POST("api/device/trip")
    Single<Response<ResponseBody>> uploadTrip(@Body JsonObject jsonObject);



    @GET("user/notification-unread-count")
    Single<Response<ResponseBody>> getNotificationCount();


}
