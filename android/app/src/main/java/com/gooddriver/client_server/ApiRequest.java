/*
 * 24/06/21, 9:55 AM
 * ApiRequest.java
 * ONKO
 *  Created by Shubham Lochan(Siya Tech) on 24/06/21, 9:55 AM
 * Copyright (c) 2021 ONKO all rights reserved
 *
 */

package com.gooddriver.client_server;

import android.content.Context;
import android.util.Log;
import com.google.gson.JsonObject;
import okhttp3.ResponseBody;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import io.reactivex.Single;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.observers.DisposableSingleObserver;
import io.reactivex.schedulers.Schedulers;

import retrofit2.Response;

public class ApiRequest {
    private OnServerResponse mCallback;

    private Context mContext;

    public ApiRequest(Context context) {
        this.mContext = context;
        try {
            this.mCallback = (OnServerResponse) mContext;

        } catch (Exception e) {

        }

    }

    public ApiRequest(Context context, OnServerResponse mOnServerResponse) {
        this.mContext = context;
        try {
            this.mCallback = mOnServerResponse;
            this.mContext = context;
        } catch (Exception e) {
        }
    }


    public void callNetworkM(Single<Response<ResponseBody>> responseSingle) {
        responseSingle.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeWith(new DisposableSingleObserver<Response<ResponseBody>>() {
                    @Override
                    public void onSuccess(Response<ResponseBody> responseBodyResponse) {

                        if (responseBodyResponse.isSuccessful()) {
                            mCallback.onSuccess("Data uploaded successfully");
                        } else {
                            mCallback.onError("Server not responding");
                        }

                    }

                    @Override
                    public void onError(Throwable e) {
                        Log.e("TAG", "Throwable: "+e.getMessage() );
                        mCallback.onError("Server not responding");
                    }
                });
    }


}
