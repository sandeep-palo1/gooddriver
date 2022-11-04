/*
 * 24/06/21, 9:55 AM
 * ApiClient.java
 * ONKO
 *  Created by Shubham Lochan(Siya Tech) on 24/06/21, 9:55 AM
 * Copyright (c) 2021 ONKO all rights reserved
 *
 */

package com.gooddriver.client_server;

import android.content.Context;

import com.gooddriver.ConstantUtil;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient.Builder;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
    static Context mContext;
    public  static String token;

    public static final <S> S createService(Class<S> serviceClass, Context context) {
        mContext = context;
        Builder builder = new Builder();
        builder.connectTimeout(3, TimeUnit.MINUTES);
        builder.readTimeout(3, TimeUnit.MINUTES);
        builder.addInterceptor(new MyInterceptor());
        return new Retrofit.Builder().baseUrl(ConstantUtil.BASE_URL).addConverterFactory(GsonConverterFactory.create()).addCallAdapterFactory(RxJava2CallAdapterFactory.create()).client(builder.build()).build().create(serviceClass);
    }

    public static class MyInterceptor implements Interceptor {

        private Request request;

        @Override
        public Response intercept(Chain chain) throws IOException {
            request = chain.request();



                if (token != null) {
                    request = request.newBuilder()
                            .addHeader("content-type", "application/json")
                            .addHeader("token", token).build();
                }
            return chain.proceed(request);
        }
    }
}
